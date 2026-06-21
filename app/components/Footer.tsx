export function Footer() {
  return (
    <footer className="py-12 border-t border-slate-100 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <a href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-brand-600 to-pink-600 flex items-center justify-center text-white font-bold text-xs">
              M
            </div>
            <span className="font-bold text-lg">MasterSell</span>
          </a>
          <p className="text-sm text-slate-500">
            © 2026 MasterSell. Все права защищены.
          </p>
          <div className="flex gap-6 text-sm text-slate-600">
            <a href="/privacy" className="hover:text-brand-700 transition">
              Политика конфиденциальности
            </a>
            <a href="/offer" className="hover:text-brand-700 transition">
              Оферта
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
