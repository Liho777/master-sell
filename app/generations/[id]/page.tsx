import Link from "next/link";
import { redirect, notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { CopyTextButton } from "./CopyTextButton";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function GenerationPage({ params }: PageProps) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const { id } = await params;

  const generation = await prisma.generation.findFirst({
    where: { id, userId: user.id },
    include: { project: true },
  });

  if (!generation) {
    notFound();
  }

  const result = (generation.resultData as unknown as Record<string, unknown>) || {};
  const promptInput =
    (generation.promptInput as unknown as Record<string, unknown>) || {};

  const title = typeof result.title === "string" ? result.title : "";
  const description = typeof result.description === "string" ? result.description : "";
  const keywords = Array.isArray(result.keywords) ? result.keywords : [];

  const concept = typeof result.concept === "string" ? result.concept : "";
  const colorScheme = Array.isArray(result.colorScheme) ? result.colorScheme : [];
  const badges = Array.isArray(result.badges) ? result.badges : [];
  const layout = typeof result.layout === "string" ? result.layout : "";
  const callToAction = typeof result.callToAction === "string" ? result.callToAction : "";
  const imageUrl = typeof result.imageUrl === "string" ? result.imageUrl : "";

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-600 to-pink-600 flex items-center justify-center text-white font-bold text-sm">
              M
            </div>
            <span className="font-bold text-xl tracking-tight">MasterSell</span>
          </Link>

          <nav className="flex items-center gap-6 text-sm font-medium text-slate-600">
            <Link href="/dashboard" className="hover:text-brand-700 transition">
              Кабинет
            </Link>
            <Link href="/generations" className="hover:text-brand-700 transition">
              История
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/generations"
            className="text-sm text-slate-500 hover:text-brand-700 transition"
          >
            ← Назад к истории
          </Link>

          <div className="mt-4 mb-8">
            <h1 className="text-3xl font-bold text-slate-900">
              {generation.type === "text" ? "Генерация текста" : "Концепт инфографики"}
            </h1>
            <p className="text-slate-500 mt-1">
              {generation.createdAt.toLocaleDateString("ru-RU", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
              {" · "}
              <span className="capitalize">{generation.status}</span>
              {generation.project && (
                <>
                  {" · Проект: "}
                  <span className="text-slate-700">{generation.project.name}</span>
                </>
              )}
            </p>
          </div>

          {generation.status === "failed" && (
            <div className="bg-red-50 text-red-700 px-4 py-3 rounded-xl mb-8">
              {(result.error as string) || "Ошибка генерации"}
            </div>
          )}

          {generation.type === "text" && (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 space-y-8">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                    Заголовок
                  </h2>
                  <CopyTextButton text={title} label="Копировать" />
                </div>
                <p className="text-lg font-medium text-slate-900">{title}</p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                    Описание
                  </h2>
                  <CopyTextButton text={description} label="Копировать" />
                </div>
                <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">{description}</p>
              </div>

              <div>
                <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
                  Ключевые слова
                </h2>
                <div className="flex flex-wrap gap-2">
                  {keywords.map((keyword, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-sm font-medium"
                    >
                      {String(keyword)}
                    </span>
                  ))}
                </div>
                <div className="mt-3">
                  <CopyTextButton
                    text={keywords.join(", ")}
                    label="Копировать список"
                  />
                </div>
              </div>

              {Object.keys(promptInput).length > 0 && (
                <div className="pt-6 border-t border-slate-100">
                  <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">
                    Запрос
                  </h2>
                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    {Boolean(promptInput.productName) && (
                      <>
                        <dt className="text-slate-500">Товар</dt>
                        <dd className="text-slate-900">{String(promptInput.productName)}</dd>
                      </>
                    )}
                    {Boolean(promptInput.category) && (
                      <>
                        <dt className="text-slate-500">Категория</dt>
                        <dd className="text-slate-900">{String(promptInput.category)}</dd>
                      </>
                    )}
                    {Boolean(promptInput.marketplace) && (
                      <>
                        <dt className="text-slate-500">Маркетплейс</dt>
                        <dd className="text-slate-900">{String(promptInput.marketplace)}</dd>
                      </>
                    )}
                  </dl>
                </div>
              )}
            </div>
          )}

          {generation.type === "image" && (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 space-y-8">
              {imageUrl && (
                <div>
                  <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
                    Готовое изображение
                  </h2>
                  <img
                    src={imageUrl}
                    alt="Инфографика"
                    className="w-full rounded-xl border border-slate-100"
                  />
                </div>
              )}

              <div>
                <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  Концепция
                </h2>
                <p className="text-slate-700 leading-relaxed">{concept}</p>
              </div>

              <div>
                <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
                  Цветовая схема
                </h2>
                <div className="flex flex-wrap gap-3">
                  {colorScheme.map((color, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div
                        className="w-8 h-8 rounded-full border border-slate-200"
                        style={{ backgroundColor: String(color) }}
                      />
                      <span className="text-sm text-slate-600 font-mono">{String(color)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
                  Плашки
                </h2>
                <div className="flex flex-wrap gap-2">
                  {badges.map(
                    (
                      badge: unknown,
                      index: number,
                    ) => {
                      const b = badge as { text?: string; style?: string };
                      return (
                        <span
                          key={index}
                          className="px-3 py-1.5 rounded-lg bg-brand-50 text-brand-700 text-sm font-medium border border-brand-100"
                          title={b.style}
                        >
                          {b.text}
                        </span>
                      );
                    },
                  )}
                </div>
              </div>

              <div>
                <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  Компоновка
                </h2>
                <p className="text-slate-700 leading-relaxed">{layout}</p>
              </div>

              <div>
                <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  Призыв к действию
                </h2>
                <p className="text-lg font-medium text-slate-900">{callToAction}</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
