import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export default async function GenerationsPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const generations = await prisma.generation.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    select: { id: true, type: true, status: true, createdAt: true },
  });

  const statusLabels: Record<string, string> = {
    pending: "В очереди",
    processing: "В обработке",
    completed: "Готово",
    failed: "Ошибка",
  };

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
            <Link href="/generate/image" className="hover:text-brand-700 transition">
              Инфографика
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/dashboard"
            className="text-sm text-slate-500 hover:text-brand-700 transition"
          >
            ← Назад в кабинет
          </Link>
          <h1 className="text-3xl font-bold text-slate-900 mt-4 mb-8">История генераций</h1>

          {generations.length > 0 ? (
            <ul className="bg-white rounded-2xl border border-slate-100 shadow-sm divide-y divide-slate-100">
              {generations.map((gen) => (
                <li
                  key={gen.id}
                  className="p-6 flex items-center justify-between hover:bg-slate-50 transition"
                >
                  <div className="flex items-center gap-4">
                    <span className="px-2.5 py-1 rounded text-xs font-medium bg-slate-100 text-slate-700">
                      {gen.type === "text" ? "Текст" : "Изображение"}
                    </span>
                    <span className="text-slate-600 text-sm">
                      {gen.createdAt.toLocaleDateString("ru-RU", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
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
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-12 text-center">
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
      </main>
    </div>
  );
}
