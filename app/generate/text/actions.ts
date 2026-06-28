"use server";

import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { createGigaChatClient } from "@/lib/gigachat";

const DAILY_LIMITS: Record<
  string,
  { text: number; image: number } | undefined
> = {
  start: { text: 3, image: 1 },
  pro: { text: 100, image: 50 },
  agency: { text: Infinity, image: Infinity },
};

function startOfDay() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

function parseJsonFromAi(text: string): unknown {
  const cleaned = text
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();
  return JSON.parse(cleaned);
}

export async function generateText(prevState: unknown, formData: FormData) {
  const user = await requireAuth();

  const productName = (formData.get("productName") as string).trim();
  const category = (formData.get("category") as string).trim();
  const features = (formData.get("features") as string).trim();
  const marketplace = (formData.get("marketplace") as string).trim();

  if (!productName || !category) {
    return { error: "Укажите название и категорию товара" };
  }

  const subscription = await prisma.subscription.findFirst({
    where: { userId: user.id, isActive: true },
  });

  const tier = subscription?.tier || "start";
  const limits = DAILY_LIMITS[tier];

  if (!limits) {
    return { error: "Не удалось определить тариф" };
  }

  const count = await prisma.generation.count({
    where: {
      userId: user.id,
      type: "text",
      createdAt: { gte: startOfDay() },
    },
  });

  if (count >= limits.text) {
    return {
      error: `Достигнут дневной лимит генераций текста (${limits.text}). Обновите тариф.`,
    };
  }

  const generation = await prisma.generation.create({
    data: {
      userId: user.id,
      type: "text",
      status: "processing",
      promptInput: JSON.stringify({ productName, category, features, marketplace }),
    },
  });

  try {
    const client = createGigaChatClient();

    const systemPrompt = `Ты — эксперт по SEO-карточкам товаров на маркетплейсах Wildberries, Ozon и Яндекс.Маркет. Твоя задача — создавать продающие тексты карточек товара. Отвечай строго в JSON-формате без пояснений.`;

    const userPrompt = `Создай SEO-оптимизированную карточку товара.

Маркетплейс: ${marketplace || "любой"}
Название товара: ${productName}
Категория: ${category}
Особенности: ${features || "не указаны"}

Верни результат строго в JSON:
{
  "title": "короткий продающий заголовок, до 60 символов",
  "description": "описание товара с ключевыми словами, 2-3 абзаца",
  "keywords": ["ключ 1", "ключ 2", "ключ 3", "ключ 4", "ключ 5"]
}`;

    const response = await client.chat({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
    });

    const raw =
      response.choices?.[0]?.message?.content ||
      '{"title":"","description":"","keywords":[]}';

    const parsed = parseJsonFromAi(raw) as {
      title?: string;
      description?: string;
      keywords?: string[];
    };

    const result = {
      title: parsed.title || "",
      description: parsed.description || "",
      keywords: Array.isArray(parsed.keywords) ? parsed.keywords : [],
    };

    await prisma.generation.update({
      where: { id: generation.id },
      data: { status: "completed", resultData: result },
    });

    return { success: true, result };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Ошибка генерации";

    await prisma.generation.update({
      where: { id: generation.id },
      data: { status: "failed", resultData: { error: message } },
    });

    return { error: message };
  }
}
