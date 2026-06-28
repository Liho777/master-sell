"use client";

import { useActionState } from "react";
import Link from "next/link";
import { signup } from "./actions";

export default function SignupPage() {
  const [state, formAction, isPending] = useActionState(signup, null);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-brand-600 to-pink-600 text-white font-bold text-lg mb-4">
            M
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Регистрация</h1>
          <p className="text-slate-500 mt-2">Создайте аккаунт MasterSell</p>
        </div>

        {state?.success ? (
          <div className="text-center space-y-4">
            <div className="text-sm text-green-700 bg-green-50 px-4 py-3 rounded-xl">
              {state.success}
            </div>
            <Link
              href="/login"
              className="inline-block w-full py-3 rounded-xl bg-brand-600 text-white font-semibold hover:bg-brand-700 transition text-center"
            >
              Перейти ко входу
            </Link>
          </div>
        ) : (
          <form action={formAction} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none transition"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">
                Пароль
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                minLength={6}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none transition"
              />
            </div>

            <div>
              <label htmlFor="confirm" className="block text-sm font-medium text-slate-700 mb-1">
                Повторите пароль
              </label>
              <input
                id="confirm"
                name="confirm"
                type="password"
                required
                minLength={6}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none transition"
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
              {isPending ? "Регистрация..." : "Зарегистрироваться"}
            </button>
          </form>
        )}

        <p className="text-center text-sm text-slate-500 mt-6">
          Уже есть аккаунт?{" "}
          <Link href="/login" className="text-brand-700 font-medium hover:underline">
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
}
