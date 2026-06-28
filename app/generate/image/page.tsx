"use client";

import { useActionState } from "react";
import Link from "next/link";
import { generateImageConcept } from "./actions";

export default function GenerateImagePage() {
  const [state, formAction, isPending] = useActionState(generateImageConcept, null);

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
            <Link href="/generate/text" className="hover:text-brand-700 transition">
              Текст
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
              AI-концепт инфографики
            </h1>
            <p className="text-slate-600">
              Загрузите фото товара — ИИ предложит плашки, цвета и компоновку.
            </p>
          </div>

          <form
            action={formAction}
            className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 space-y-6"
          >
            <div>
              <label
                htmlFor="image"
                className="block text-sm font-medium text-slate-700 mb-1"
              >
                Фото товара *
              </label>
              <input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none transition file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-brand-50 file:text-brand-700 file:font-medium"
              />
              <p className="text-xs text-slate-500 mt-2">Максимум 5 МБ</p>
            </div>

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

            <div>
              <label
                htmlFor="features"
                className="block text-sm font-medium text-slate-700 mb-1"
              >
                Особенности, преимущества
              </label>
              <textarea
                id="features"
                name="features"
                rows={4}
                placeholder="Например: активное шумоподавление, 30 часов автономной работы..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none transition resize-none"
              />
            </div>

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
              {isPending ? "Анализ фото..." : "Создать концепт"}
            </button>
          </form>

          {state?.success && state.result && (
            <div className="mt-8 bg-white rounded-2xl border border-slate-100 shadow-sm p-8 space-y-6">
              <h2 className="text-xl font-bold text-slate-900">Результат</h2>

              <div>
                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  Концепция
                </h3>
                <p className="text-slate-700 leading-relaxed">{state.result.concept}</p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  Цветовая схема
                </h3>
                <div className="flex flex-wrap gap-3">
                  {state.result.colorScheme.map((color: string, index: number) => (
                    <div key={index} className="flex items-center gap-2">
                      <div
                        className="w-8 h-8 rounded-full border border-slate-200"
                        style={{ backgroundColor: color }}
                      />
                      <span className="text-sm text-slate-600 font-mono">{color}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  Плашки
                </h3>
                <div className="flex flex-wrap gap-2">
                  {state.result.badges.map(
                    (badge: { text: string; style: string }, index: number) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 rounded-lg bg-brand-50 text-brand-700 text-sm font-medium border border-brand-100"
                        title={badge.style}
                      >
                        {badge.text}
                      </span>
                    ),
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  Компоновка
                </h3>
                <p className="text-slate-700 leading-relaxed">{state.result.layout}</p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  Призыв к действию
                </h3>
                <p className="text-lg font-medium text-slate-900">{state.result.callToAction}</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
