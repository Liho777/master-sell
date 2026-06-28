"use server";

import { createClient } from "@/lib/supabase/server";
import { createGigaChatClient } from "@/lib/gigachat";

const DAILY_LIMITS: Record<
  string,
  { text: number; image: number } | undefined
> = {
  start: { text: 3, image: 1 },
  pro: { text: 100, image: 50 },
  agency: { text: Infinity, image: Infinity },
};

function startOfDayIso() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d.toISOString();
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
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Требуется авторизация" };
  }

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

  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("tier")
    .eq("user_id", user.id)
    .single();

  const tier = subscription?.tier || "start";
  const limits = DAILY_LIMITS[tier];

  if (!limits) {
    return { error: "Не удалось определить тариф" };
  }

  const { count } = await supabase
    .from("generations")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id)
    .eq("type", "image")
    .gte("created_at", startOfDayIso());

  if (count !== null && count >= limits.image) {
    return {
      error: `Достигнут дневной лимит генераций изображений (${limits.image}). Обновите тариф.`,
    };
  }

  const { data: generation, error: insertError } = await supabase
    .from("generations")
    .insert({
      user_id: user.id,
      type: "image",
      status: "processing",
      prompt_input: JSON.stringify({ productName, features, fileName: imageFile.name }),
    })
    .select("id")
    .single();

  if (insertError || !generation) {
    return { error: "Не удалось создать задачу генерации" };
  }

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
      "{\"concept\":\"\",\"colorScheme\":[],\"badges\":[],\"layout\":\"\",\"callToAction\":\"\"}";

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

    await supabase
      .from("generations")
      .update({
        status: "completed",
        result_data: result,
      })
      .eq("id", generation.id);

    return { success: true, result };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Ошибка генерации";

    await supabase
      .from("generations")
      .update({ status: "failed", result_data: { error: message } })
      .eq("id", generation.id);

    return { error: message };
  }
}
