"use client";

import { useActionState } from "react";
import Link from "next/link";
import { generateText } from "./actions";
import { CopyTextButton } from "../../generations/[id]/CopyTextButton";
import { MarketplaceSelector } from "../../components/MarketplaceSelector";

interface GenerateTextClientPageProps {
  projects: { id: string; name: string }[];
}

export default function GenerateTextClientPage({
  projects,
}: GenerateTextClientPageProps) {
  const [state, formAction, isPending] = useActionState(generateText, null);

  const result = state?.success ? state.result : null;

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
            <Link href="/generate/image" className="hover:text-brand-700 transition">
              Инфографика
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link
              href="/dashboard"
              className="text-sm text-slate-500 hover:text-brand-700 transition"
            >
              ← Назад в кабинет
            </Link>
            <h1 className="text-3xl font-bold text-slate-900 mt-4 mb-2">
              Генерация SEO-текста
            </h1>
            <p className="text-slate-600">
              Опишите товар — ИИ создаст заголовок, описание и ключевые слова.
            </p>
          </div>

          <form
            action={formAction}
            className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 space-y-6"
          >
            <div>
              <label
                htmlFor="productName"
                className="block text-sm font-medium text-slate-700 mb-1"
              >
                Название товара *
              </label>
              <input
                id="productName"
                name="productName"
                type="text"
                required
                placeholder="Например: Беспроводные наушники AirPro 200"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none transition"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  Категория *
                </label>
                <input
                  id="category"
                  name="category"
                  type="text"
                  required
                  placeholder="Например: Электроника"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none transition"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Маркетплейс *
                </label>
                <MarketplaceSelector name="marketplace" />
              </div>
            </div>

            <div>
              <label
                htmlFor="features"
                className="block text-sm font-medium text-slate-700 mb-1"
              >
                Особенности, преимущества, ключевые характеристики
              </label>
              <textarea
                id="features"
                name="features"
                rows={5}
                placeholder="Например: активное шумоподавление, 30 часов автономной работы, быстрая зарядка, влагозащита IPX5..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none transition resize-none"
              />
            </div>

            {projects.length > 0 && (
              <div>
                <label
                  htmlFor="projectId"
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  Сохранить в проект
                </label>
                <select
                  id="projectId"
                  name="projectId"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none transition bg-white"
                >
                  <option value="">Без проекта</option>
                  {projects.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {state?.error && (
              <div className="text-sm text-red-600 bg-red-50 px-4 py-3 rounded-xl">
                {state.error}
              </div>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="w-full py-3 rounded-xl bg-brand-600 text-white font-semibold hover:bg-brand-700 transition disabled:opacity-50"
            >
              {isPending ? "Генерация..." : "Сгенерировать текст"}
            </button>
          </form>

          {result && (
            <div className="mt-8 bg-white rounded-2xl border border-slate-100 shadow-sm p-8 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-900">Результат</h2>
                {state?.generationId && (
                  <Link
                    href={`/generations/${state.generationId}`}
                    className="text-sm text-brand-700 hover:text-brand-800 font-medium"
                  >
                    Открыть полностью →
                  </Link>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                    Заголовок
                  </h3>
                  <CopyTextButton text={result.title} />
                </div>
                <p className="text-lg font-medium text-slate-900">{result.title}</p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                    Описание
                  </h3>
                  <CopyTextButton text={result.description} />
                </div>
                <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                  {result.description}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
                  Ключевые слова
                </h3>
                <div className="flex flex-wrap gap-2">
                  {result.keywords.map((keyword: string, index: number) => (
                    <span
                      key={index}
                      className="px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-sm font-medium"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
                <div className="mt-3">
                  <CopyTextButton
                    text={result.keywords.join(", ")}
                    label="Копировать список"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
