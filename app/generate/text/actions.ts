"use server";

import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { createGigaChatClient } from "@/lib/gigachat";
import { checkTextLimit } from "@/lib/limits";

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
  const projectId = (formData.get("projectId") as string) || undefined;

  if (!productName || !category) {
    return { error: "Укажите название и категорию товара" };
  }

  if (!marketplace) {
    return { error: "Выберите маркетплейс" };
  }

  try {
    await checkTextLimit(user.id);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Ошибка проверки лимита";
    return { error: message };
  }

  const generation = await prisma.generation.create({
    data: {
      userId: user.id,
      projectId,
      type: "text",
      status: "processing",
      promptInput: JSON.stringify({ productName, category, features, marketplace }),
    },
  });

  try {
    const client = createGigaChatClient();

    const systemPrompt = `Ты — эксперт по продающим карточкам товаров на маркетплейсах Wildberries, Ozon, Яндекс.Маркет и Авито. Твоя задача — создавать продающие тексты карточек товара. Отвечай строго в JSON-формате без пояснений.`;

    const marketplaceRules: Record<string, string> = {
      Wildberries:
        "Wildberries: короткий продающий заголовок до 60 символов, описание 2-3 абзаца с ключевыми словами, 5 ключевых слов.",
      Ozon:
        "Ozon: чёткий информативный заголовок до 60 символов, структурированное описание с характеристиками, 5 ключевых слов.",
      "Яндекс.Маркет":
        "Яндекс.Маркет: информативный заголовок, подробное описание с акцентом на характеристики и выгоды, 5 ключевых слов.",
      Авито:
        "Авито: чёткий заголовок с ключевыми словами без лишних эпитетов, информативное описание без перегрузки emoji, с акцентом на состояние и характеристики, 5 ключевых слов.",
    };

    const userPrompt = `Создай карточку товара для маркетплейса ${marketplace}.

Название товара: ${productName}
Категория: ${category}
Особенности: ${features || "не указаны"}

Требования площадки: ${marketplaceRules[marketplace]}

Верни результат строго в JSON:
{
  "title": "...",
  "description": "...",
  "keywords": ["...", "...", "...", "...", "..."]
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

    return { success: true, result, generationId: generation.id };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Ошибка генерации";

    await prisma.generation.update({
      where: { id: generation.id },
      data: { status: "failed", resultData: { error: message } },
    });

    return { error: message };
  }
}
