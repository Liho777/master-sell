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

export async function generateImageConcept(
  prevState: unknown,
  formData: FormData,
) {
  const user = await requireAuth();

  const productName = (formData.get("productName") as string).trim();
  const features = (formData.get("features") as string).trim();
  const imageFile = formData.get("image") as File | null;

  if (!productName) {
    return { error: "Укажите название товара" };
  }

  if (!imageFile || imageFile.size === 0) {
    return { error: "Загрузите фото товара" };
  }

  if (imageFile.size > 5 * 1024 * 1024) {
    return { error: "Фото не должно превышать 5 МБ" };
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
      type: "image",
      createdAt: { gte: startOfDay() },
    },
  });

  if (count >= limits.image) {
    return {
      error: `Достигнут дневной лимит генераций изображений (${limits.image}). Обновите тариф.`,
    };
  }

  const generation = await prisma.generation.create({
    data: {
      userId: user.id,
      type: "image",
      status: "processing",
      promptInput: JSON.stringify({ productName, features, fileName: imageFile.name }),
    },
  });

  try {
    const client = createGigaChatClient();

    const uploaded = await client.uploadFile(imageFile, "general");

    const systemPrompt = `Ты — дизайнер инфографики для карточек товаров на маркетплейсах Wildberries, Ozon и Яндекс.Маркет. Ты анализируешь фото товара и предлагаешь структуру инфографики. Отвечай строго в JSON-формате без пояснений.`;

    const userPrompt = `Проанализируй фото товара "${productName}".
Особенности: ${features || "не указаны"}.

Предложи структуру инфографики для карточки товара. Верни результат строго в JSON:
{
  "concept": "краткое описание визуальной концепции",
  "colorScheme": ["#HEX1", "#HEX2", "#HEX3"],
  "badges": [
    {"text": "текст плашки 1", "style": "акцентная/информационная/выгодная"},
    {"text": "текст плашки 2", "style": "акцентная/информационная/выгодная"},
    {"text": "текст плашки 3", "style": "акцентная/информационная/выгодная"}
  ],
  "layout": "описание расположения фото, плашек и текста",
  "callToAction": "фраза-призыв к действию для карточки"
}`;

    const response = await client.chat({
      messages: [
        { role: "system", content: systemPrompt },
        {
          role: "user",
          content: userPrompt,
          attachments: [uploaded.id],
        },
      ],
    });

    const raw =
      response.choices?.[0]?.message?.content ||
      '{"concept":"","colorScheme":[],"badges":[],"layout":"","callToAction":""}';

    const parsed = parseJsonFromAi(raw) as {
      concept?: string;
      colorScheme?: string[];
      badges?: { text?: string; style?: string }[];
      layout?: string;
      callToAction?: string;
    };

    const result = {
      concept: parsed.concept || "",
      colorScheme: Array.isArray(parsed.colorScheme) ? parsed.colorScheme : [],
      badges: Array.isArray(parsed.badges)
        ? parsed.badges.map((b) => ({
            text: b.text || "",
            style: b.style || "",
          }))
        : [],
      layout: parsed.layout || "",
      callToAction: parsed.callToAction || "",
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
