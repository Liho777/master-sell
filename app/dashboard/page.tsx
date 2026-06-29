import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { getUserLimits, TIER_LABELS } from "@/lib/limits";
import { logout } from "../logout/actions";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const [profile, subscription, limits, recentGenerations] = await Promise.all([
    prisma.profile.findUnique({ where: { userId: user.id } }),
    prisma.subscription.findFirst({ where: { userId: user.id, isActive: true } }),
    getUserLimits(user.id),
    prisma.generation.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      take: 10,
      select: { id: true, type: true, status: true, createdAt: true },
    }),
  ]);

  const statusLabels: Record<string, string> = {
    pending: "В очереди",
    processing: "В обработке",
    completed: "Готово",
    failed: "Ошибка",
  };

  const formatRemaining = (value: number) =>
    value === Infinity ? "∞" : value.toString();

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
            <Link href="/generate/text" className="hover:text-brand-700 transition">
              Текст
            </Link>
            <Link href="/generate/image" className="hover:text-brand-700 transition">
              Инфографика
            </Link>
            <form action={logout}>
              <button
                type="submit"
                className="text-slate-500 hover:text-red-600 transition"
              >
                Выйти
              </button>
            </form>
          </nav>
        </div>
      </header>

      <main className="flex-1 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              Привет, {profile?.fullName || user.email}!
            </h1>
            <p className="text-slate-600">
              Тариф:{" "}
              <span className="font-semibold text-brand-700">
                {TIER_LABELS[subscription?.tier || "start"] || "Старт"}
              </span>
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <p className="text-sm text-slate-500 mb-1">Текстов сегодня</p>
              <p className="text-2xl font-bold text-slate-900">
                {limits.textUsed} / {formatRemaining(limits.textLimit)}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Осталось {formatRemaining(limits.textRemaining)}
              </p>
            </div>
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <p className="text-sm text-slate-500 mb-1">Инфографик сегодня</p>
              <p className="text-2xl font-bold text-slate-900">
                {limits.imageUsed} / {formatRemaining(limits.imageLimit)}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Осталось {formatRemaining(limits.imageRemaining)}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Link
              href="/generate/text"
              className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-md transition"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-bold mb-2">Генерация текста</h2>
              <p className="text-slate-600">
                SEO-заголовок, описание и ключевые слова для карточки товара.
              </p>
            </Link>

            <Link
              href="/generate/image"
              className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-md transition"
            >
              <div className="w-12 h-12 rounded-xl bg-pink-100 text-pink-700 flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-bold mb-2">Генерация инфографики</h2>
              <p className="text-slate-600">
                AI-концепт инфографики по фото товара.
              </p>
            </Link>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Последние генерации</h2>
              {recentGenerations.length > 0 && (
                <Link
                  href="/generations"
                  className="text-sm text-brand-700 hover:text-brand-800 font-medium"
                >
                  Вся история →
                </Link>
              )}
            </div>

            {recentGenerations.length > 0 ? (
              <ul className="divide-y divide-slate-100">
                {recentGenerations.map((gen) => (
                  <li key={gen.id} className="py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="px-2 py-1 rounded text-xs font-medium bg-slate-100 text-slate-700">
                        {gen.type === "text" ? "Текст" : "Изображение"}
                      </span>
                      <span className="text-slate-600 text-sm">
                        {gen.createdAt.toLocaleDateString("ru-RU")}
                      </span>
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded ${
                          gen.status === "completed"
                            ? "bg-green-100 text-green-700"
                            : gen.status === "failed"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {statusLabels[gen.status] || gen.status}
                      </span>
                    </div>
                    <Link
                      href={`/generations/${gen.id}`}
                      className="text-sm text-brand-700 hover:text-brand-800 font-medium"
                    >
                      Открыть →
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-12">
                <p className="text-slate-500 mb-4">У вас пока нет генераций.</p>
                <Link
                  href="/generate/text"
                  className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-brand-600 text-white font-medium hover:bg-brand-700 transition"
                >
                  Создать первую
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
