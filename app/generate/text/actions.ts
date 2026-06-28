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

export async function generateText(prevState: unknown, formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Требуется авторизация" };
  }

  const productName = (formData.get("productName") as string).trim();
  const category = (formData.get("category") as string).trim();
  const features = (formData.get("features") as string).trim();
  const marketplace = (formData.get("marketplace") as string).trim();

  if (!productName || !category) {
    return { error: "Укажите название и категорию товара" };
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
    .eq("type", "text")
    .gte("created_at", startOfDayIso());

  if (count !== null && count >= limits.text) {
    return {
      error: `Достигнут дневной лимит генераций текста (${limits.text}). Обновите тариф.`,
    };
  }

  const { data: generation, error: insertError } = await supabase
    .from("generations")
    .insert({
      user_id: user.id,
      type: "text",
      status: "processing",
      prompt_input: JSON.stringify({ productName, category, features, marketplace }),
    })
    .select("id")
    .single();

  if (insertError || !generation) {
    return { error: "Не удалось создать задачу генерации" };
  }

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
      "{\"title\":\"\",\"description\":\"\",\"keywords\":[]}";

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
