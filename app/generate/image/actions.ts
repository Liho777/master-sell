"use server";

import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { createGigaChatClient } from "@/lib/gigachat";
import { checkImageLimit } from "@/lib/limits";
import { renderInfographic, InfographicConcept } from "@/lib/infographic";

function parseJsonFromAi(text: string): unknown {
  const cleaned = text
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();
  return JSON.parse(cleaned);
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      resolve(result);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export async function generateImageConcept(
  prevState: unknown,
  formData: FormData,
) {
  const user = await requireAuth();

  const productName = (formData.get("productName") as string).trim();
  const features = (formData.get("features") as string).trim();
  const imageFile = formData.get("image") as File | null;
  const projectId = (formData.get("projectId") as string) || undefined;

  if (!productName) {
    return { error: "Укажите название товара" };
  }

  if (!imageFile || imageFile.size === 0) {
    return { error: "Загрузите фото товара" };
  }

  if (imageFile.size > 5 * 1024 * 1024) {
    return { error: "Фото не должно превышать 5 МБ" };
  }

  try {
    await checkImageLimit(user.id);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Ошибка проверки лимита";
    return { error: message };
  }

  const generation = await prisma.generation.create({
    data: {
      userId: user.id,
      projectId,
      type: "image",
      status: "processing",
      promptInput: JSON.stringify({ productName, features, fileName: imageFile.name }),
    },
  });

  try {
    const client = createGigaChatClient();

    const uploaded = await client.uploadFile(imageFile, "general");

    const systemPrompt = `Ты — дизайнер инфографики для карточек товаров на маркетплейсах Wildberries, Ozon, Яндекс.Маркет и Авито. Ты анализируешь фото товара и предлагаешь структуру инфографики. Отвечай строго в JSON-формате без пояснений.`;

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

    const concept: InfographicConcept = {
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
      productName,
    };

    const productImageBase64 = await fileToBase64(imageFile);
    const { url } = await renderInfographic(concept, { productImageBase64 });

    const result = {
      ...concept,
      imageUrl: url,
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
