import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

const BASE_SIGNUP_COUNT = 127;

export default function Home() {
  return (
    <div className="antialiased text-slate-900 bg-white min-h-full">
      <Header />

      {/* Hero */}
      <section className="hero-gradient pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-semibold mb-6">
                <span>Скоро запуск</span>
                <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse"></span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
                Создавайте карточки товаров с&nbsp;
                <span className="gradient-text">ИИ</span>
              </h1>
              <p className="text-lg sm:text-xl text-slate-600 mb-8 leading-relaxed">
                Генерируйте продающие SEO-тексты и профессиональную инфографику
                для Wildberries, Ozon и Яндекс.Маркет за минуты — без дизайнера
                и копирайтера.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#waitlist"
                  className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-brand-600 text-white font-semibold hover:bg-brand-700 transition shadow-lg shadow-brand-200"
                >
                  Попасть в список ожидания
                </a>
                <a
                  href="#features"
                  className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:border-brand-300 hover:text-brand-700 transition"
                >
                  Узнать больше
                </a>
              </div>
              <div className="mt-8 flex items-center gap-4 text-sm text-slate-500">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white"></div>
                  <div className="w-8 h-8 rounded-full bg-slate-300 border-2 border-white"></div>
                  <div className="w-8 h-8 rounded-full bg-slate-400 border-2 border-white"></div>
                </div>
                <p>
                  Уже <strong className="text-slate-900">{BASE_SIGNUP_COUNT}</strong>{" "}
                  селлеров в очереди
                </p>
              </div>
            </div>

            {/* Product mockup */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-brand-200 to-pink-200 rounded-3xl blur-2xl opacity-30"></div>
              <div className="relative bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
                <div className="bg-slate-50 px-4 py-3 border-b border-slate-100 flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  <span className="ml-auto text-xs text-slate-400">
                    MasterSell Dashboard
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex gap-4 mb-6">
                    <div className="w-1/3">
                      <div className="aspect-square rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center mb-2">
                        <svg
                          className="w-10 h-10 text-slate-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <p className="text-xs text-slate-500 text-center">Фото товара</p>
                    </div>
                    <div className="w-2/3 space-y-3">
                      <div className="h-4 bg-brand-100 rounded w-3/4"></div>
                      <div className="h-3 bg-slate-100 rounded w-full"></div>
                      <div className="h-3 bg-slate-100 rounded w-5/6"></div>
                      <div className="h-3 bg-slate-100 rounded w-4/6"></div>
                      <div className="flex gap-2 mt-4">
                        <span className="px-2 py-1 rounded bg-brand-50 text-brand-700 text-xs">
                          SEO-текст
                        </span>
                        <span className="px-2 py-1 rounded bg-pink-50 text-pink-700 text-xs">
                          Инфографика
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="aspect-[4/5] rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex flex-col items-center justify-center text-white p-4 text-center">
                      <svg
                        className="w-8 h-8 mb-2 opacity-80"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                      <span className="text-xs font-semibold">Быстрая доставка</span>
                    </div>
                    <div className="aspect-[4/5] rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex flex-col items-center justify-center text-white p-4 text-center">
                      <svg
                        className="w-8 h-8 mb-2 opacity-80"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span className="text-xs font-semibold">Премиум качество</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Logos / Trust */}
      <section className="py-10 border-y border-slate-100 bg-slate-50/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-slate-500 mb-6">
            Подходит для всех популярных маркетплейсов
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12 opacity-60 grayscale">
            <div className="flex items-center gap-2 text-lg font-bold">
              <span className="text-purple-700">WB</span> Wildberries
            </div>
            <div className="flex items-center gap-2 text-lg font-bold">
              <span className="text-blue-600">O</span> Ozon
            </div>
            <div className="flex items-center gap-2 text-lg font-bold">
              <span className="text-yellow-500">Я</span> Яндекс.Маркет
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 lg:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Всё, чтобы карточка продавала
            </h2>
            <p className="text-lg text-slate-600">
              Два инструмента, которые закрывают 80% рутины при создании карточки
              товара.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center mb-6">
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
              <h3 className="text-xl font-bold mb-3">SEO-тексты за секунды</h3>
              <p className="text-slate-600 mb-6">
                Введите название товара и его особенности — ИИ создаст продающий
                заголовок, описание и подберёт релевантные ключевые слова для вашей
                ниши.
              </p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckIcon />
                  Заголовок под требования маркетплейса
                </li>
                <li className="flex items-start gap-2">
                  <CheckIcon />
                  Описание с ключевыми словами
                </li>
                <li className="flex items-start gap-2">
                  <CheckIcon />
                  Тон под ваш бренд
                </li>
              </ul>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 rounded-xl bg-pink-100 text-pink-700 flex items-center justify-center mb-6">
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
              <h3 className="text-xl font-bold mb-3">
                Инфографика из обычного фото
              </h3>
              <p className="text-slate-600 mb-6">
                Загрузите фото товара — сервис сам уберёт фон, добавит шаблон,
                иконки и плашки с преимуществами. Готовое изображение для карточки.
              </p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckIcon />
                  Удаление фона
                </li>
                <li className="flex items-start gap-2">
                  <CheckIcon />
                  Готовые шаблоны под разные категории
                </li>
                <li className="flex items-start gap-2">
                  <CheckIcon />
                  AI-тексты для плашек
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-20 lg:py-28 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Как это работает</h2>
            <p className="text-lg text-slate-600">
              От фото и описания — до готовой карточки за три шага.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-brand-600 text-white flex items-center justify-center font-bold mb-4">
                1
              </div>
              <h3 className="text-lg font-bold mb-2">Загрузите фото и данные</h3>
              <p className="text-slate-600 text-sm">
                Добавьте фото товара, укажите название, категорию и ключевые
                особенности.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-brand-600 text-white flex items-center justify-center font-bold mb-4">
                2
              </div>
              <h3 className="text-lg font-bold mb-2">ИИ всё сделает</h3>
              <p className="text-slate-600 text-sm">
                Сервис создаёт SEO-текст и визуализирует инфографику на основе
                шаблонов.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-brand-600 text-white flex items-center justify-center font-bold mb-4">
                3
              </div>
              <h3 className="text-lg font-bold mb-2">Заберите результат</h3>
              <p className="text-slate-600 text-sm">
                Скачайте готовые тексты и изображения для загрузки на маркетплейс.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 lg:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Тарифы</h2>
            <p className="text-lg text-slate-600">
              Простая цена без скрытых платежей. Первые пользователи получат скидку
              на запуске.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Старт</h3>
              <p className="text-slate-500 text-sm mb-6">
                Для теста и маленьких ассортиментов
              </p>
              <div className="text-4xl font-bold mb-6">0 ₽</div>
              <ul className="space-y-3 text-sm text-slate-600 mb-8">
                <li className="flex items-center gap-2">
                  <CheckIcon /> 3 генерации текста в день
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon /> 1 изображение в день
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon /> Базовые шаблоны
                </li>
              </ul>
              <a
                href="#waitlist"
                className="block w-full py-3 rounded-xl border border-slate-200 text-center font-medium text-slate-700 hover:border-brand-300 hover:text-brand-700 transition"
              >
                Выбрать
              </a>
            </div>

            {/* Pro */}
            <div className="bg-white rounded-2xl p-8 border-2 border-brand-500 shadow-lg shadow-brand-100 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-brand-600 text-white text-xs font-semibold rounded-full">
                Популярный
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Профи</h3>
              <p className="text-slate-500 text-sm mb-6">Для активных селлеров</p>
              <div className="text-4xl font-bold mb-6">
                1 990 ₽<span className="text-base font-normal text-slate-500">/мес</span>
              </div>
              <ul className="space-y-3 text-sm text-slate-600 mb-8">
                <li className="flex items-center gap-2">
                  <CheckIcon /> 100 генераций текста в день
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon /> 50 изображений в день
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon /> Все шаблоны
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon /> История генераций
                </li>
              </ul>
              <a
                href="#waitlist"
                className="block w-full py-3 rounded-xl bg-brand-600 text-center font-medium text-white hover:bg-brand-700 transition"
              >
                Выбрать
              </a>
            </div>

            {/* Agency */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Агентство</h3>
              <p className="text-slate-500 text-sm mb-6">Для команд и агентств</p>
              <div className="text-4xl font-bold mb-6">
                4 990 ₽<span className="text-base font-normal text-slate-500">/мес</span>
              </div>
              <ul className="space-y-3 text-sm text-slate-600 mb-8">
                <li className="flex items-center gap-2">
                  <CheckIcon /> Безлимит генераций
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon /> Безлимит изображений
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon /> Множественные аккаунты
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon /> Приоритетная поддержка
                </li>
              </ul>
              <a
                href="#waitlist"
                className="block w-full py-3 rounded-xl border border-slate-200 text-center font-medium text-slate-700 hover:border-brand-300 hover:text-brand-700 transition"
              >
                Выбрать
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Waitlist */}
      <section
        id="waitlist"
        className="py-20 lg:py-28 bg-gradient-to-br from-brand-900 to-brand-700 text-white"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Станьте одним из первых
          </h2>
          <p className="text-lg text-brand-100 mb-8">
            Оставьте email — сообщим о запуске и дадим скидку 50% на первый месяц.
            Без спама.
          </p>

          <div className="max-w-md mx-auto">
            <iframe
              src="https://forms.yandex.ru/u/6a37406e95add53e5a2411c6/?iframe=1"
              width="100%"
              height="300"
              frameBorder="0"
              title="Форма предзаказа MasterSell"
              className="rounded-xl bg-white/5"
            ></iframe>
          </div>

          <p className="mt-4 text-sm text-brand-200">
            Данные хранятся на серверах в РФ в соответствии с 152-ФЗ.{" "}
            <a href="/privacy" className="underline hover:text-white">
              Политика конфиденциальности
            </a>
          </p>

          <div className="mt-10 grid sm:grid-cols-3 gap-6 text-left">
            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
              <div className="text-2xl font-bold">50%</div>
              <div className="text-sm text-brand-200">скидка первым пользователям</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
              <div className="text-2xl font-bold">∞</div>
              <div className="text-sm text-brand-200">
                обратная связь и влияние на продукт
              </div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
              <div className="text-2xl font-bold">0 ₽</div>
              <div className="text-sm text-brand-200">до запуска и без обязательств</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 lg:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Частые вопросы</h2>
          </div>

          <div className="space-y-4">
            <details className="group bg-white rounded-xl border border-slate-100 open:shadow-sm transition">
              <summary className="flex items-center justify-between p-6 cursor-pointer font-semibold list-none">
                Когда будет запуск?
                <svg
                  className="w-5 h-5 text-slate-400 group-open:rotate-180 transition"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>
              <p className="px-6 pb-6 text-slate-600">
                Планируем запустить MVP в течение 6–8 недель. Подписчики списка
                ожидания получат доступ первыми.
              </p>
            </details>

            <details className="group bg-white rounded-xl border border-slate-100 open:shadow-sm transition">
              <summary className="flex items-center justify-between p-6 cursor-pointer font-semibold list-none">
                Для каких маркетплейсов подходит?
                <svg
                  className="w-5 h-5 text-slate-400 group-open:rotate-180 transition"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>
              <p className="px-6 pb-6 text-slate-600">
                Wildberries, Ozon и Яндекс.Маркет. Тексты адаптируются под
                требования каждой площадки.
              </p>
            </details>

            <details className="group bg-white rounded-xl border border-slate-100 open:shadow-sm transition">
              <summary className="flex items-center justify-between p-6 cursor-pointer font-semibold list-none">
                Нужен ли дизайнер, чтобы пользоваться сервисом?
                <svg
                  className="w-5 h-5 text-slate-400 group-open:rotate-180 transition"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>
              <p className="px-6 pb-6 text-slate-600">
                Нет. Достаточно загрузить фото товара — сервис сам создаст готовую
                инфографику на основе шаблонов.
              </p>
            </details>

            <details className="group bg-white rounded-xl border border-slate-100 open:shadow-sm transition">
              <summary className="flex items-center justify-between p-6 cursor-pointer font-semibold list-none">
                Какие AI-модели используются?
                <svg
                  className="w-5 h-5 text-slate-400 group-open:rotate-180 transition"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>
              <p className="px-6 pb-6 text-slate-600">
                Для русскоязычных текстов используем YandexGPT и другие современные
                языковые модели. Визуал строится на проверенных шаблонах и
                AI-обработке изображений.
              </p>
            </details>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function CheckIcon() {
  return (
    <svg
      className="w-5 h-5 text-green-500 flex-shrink-0"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}
