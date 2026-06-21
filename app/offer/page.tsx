import type { Metadata } from "next";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export const metadata: Metadata = {
  title: "Публичная оферта — MasterSell",
  description:
    "Публичная оферта на использование сервиса MasterSell для создания карточек товаров на маркетплейсах.",
};

export default function OfferPage() {
  return (
    <div className="antialiased text-slate-900 bg-white min-h-full flex flex-col">
      <Header />

      <main className="flex-1 py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-8">
            Публичная оферта
          </h1>

          <p className="text-slate-600 mb-8 leading-relaxed">
            Настоящий документ является публичной офертой в соответствии со
            статьёй 437 Гражданского кодекса Российской Федерации. Использование
            сайта и сервиса MasterSell означает безоговорочное принятие условий
            настоящей оферты.
          </p>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3">1. Оператор сервиса</h2>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Название: [УКАЖИТЕ ИП / ООО / самозанятость]</li>
              <li>ИНН: [УКАЖИТЕ ИНН]</li>
              <li>ОГРН / ОГРНИП: [УКАЖИТЕ при наличии]</li>
              <li>Адрес: [УКАЖИТЕ АДРЕС]</li>
              <li>Email: [УКАЖИТЕ EMAIL]</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3">2. Предмет оферты</h2>
            <p className="text-slate-600 leading-relaxed">
              MasterSell предоставляет пользователю доступ к онлайн-сервису для
              генерации SEO-текстов и инфографики для карточек товаров на
              маркетплейсах Wildberries, Ozon, Яндекс.Маркет и других площадках.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3">3. Регистрация и доступ</h2>
            <p className="text-slate-600 leading-relaxed">
              Для использования сервиса пользователь оставляет контактные данные
              через форму на сайте. Доступ к функциям предоставляется после
              запуска сервиса в порядке очереди или в соответствии с выбранным
              тарифом.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3">4. Тарифы и оплата</h2>
            <p className="text-slate-600 leading-relaxed">
              Актуальные тарифы и лимиты размещаются на странице «Тарифы». Оплата
              производится в порядке, указанном в личном кабинете. Стоимость и
              условия могут изменяться; пользователю сообщается о новых условиях
              до момента продления или смены тарифа.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3">5. Права и обязанности сторон</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              <strong>Пользователь обязуется:</strong>
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600 mb-4">
              <li>предоставлять достоверные контактные данные;</li>
              <li>не использовать сервис для создания запрещённого контента;</li>
              <li>
                не нарушать права третьих лиц при загрузке фото и описаний
                товаров.
              </li>
            </ul>
            <p className="text-slate-600 leading-relaxed mb-4">
              <strong>Оператор обязуется:</strong>
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>
                обеспечить работоспособность сервиса в разумных пределах;
              </li>
              <li>соблюдать конфиденциальность данных в соответствии с политикой;</li>
              <li>информировать пользователя о существенных изменениях сервиса.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3">6. Интеллектуальная собственность</h2>
            <p className="text-slate-600 leading-relaxed">
              Все права на программное обеспечение, дизайн и контент сервиса
              принадлежат оператору. Пользователь получает ограниченное право
              использовать результаты работы сервиса в рамках своей
              предпринимательской деятельности.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3">7. Ограничение ответственности</h2>
            <p className="text-slate-600 leading-relaxed">
              Оператор не несёт ответственности за соответствие сгенерированных
              текстов и изображений требованиям конкретных маркетплейсов и не
              гарантирует рост продаж. Пользователь самостоятельно проверяет
              материалы перед публикацией.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3">8. Изменения условий</h2>
            <p className="text-slate-600 leading-relaxed">
              Оператор вправе изменять условия настоящей оферты. Новая редакция
              вступает в силу с момента её размещения на сайте, если иное не
              указано дополнительно.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3">9. Контакты</h2>
            <p className="text-slate-600 leading-relaxed">
              По вопросам использования сервиса и по условиям оферты пишите на
              email: [УКАЖИТЕ EMAIL].
            </p>
          </section>

          <p className="text-sm text-slate-500 mt-12">
            Дата последнего обновления: 21 июня 2026 г.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
