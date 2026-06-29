import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { logout } from "@/app/logout/actions";

export async function Header() {
  const user = await getCurrentUser();

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-600 to-pink-600 flex items-center justify-center text-white font-bold text-sm">
              M
            </div>
            <span className="font-bold text-xl tracking-tight">MasterSell</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="/#features" className="hover:text-brand-700 transition">
              Возможности
            </a>
            <a href="/#how-it-works" className="hover:text-brand-700 transition">
              Как это работает
            </a>
            <a href="/#pricing" className="hover:text-brand-700 transition">
              Тарифы
            </a>
            <a href="/#faq" className="hover:text-brand-700 transition">
              FAQ
            </a>
          </nav>
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="hidden sm:inline-flex items-center justify-center px-4 py-2 rounded-lg bg-brand-600 text-white text-sm font-medium hover:bg-brand-700 transition"
                >
                  Кабинет
                </Link>
                <form action={logout} className="hidden sm:block">
                  <button
                    type="submit"
                    className="text-sm font-medium text-slate-500 hover:text-red-600 transition"
                  >
                    Выйти
                  </button>
                </form>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm font-medium text-slate-600 hover:text-brand-700 transition"
                >
                  Войти
                </Link>
                <Link
                  href="/signup"
                  className="hidden sm:inline-flex items-center justify-center px-4 py-2 rounded-lg bg-brand-600 text-white text-sm font-medium hover:bg-brand-700 transition"
                >
                  Регистрация
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
