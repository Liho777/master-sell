import type { Metadata } from "next";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export const metadata: Metadata = {
  title: "Политика конфиденциальности — MasterSell",
  description:
    "Порядок обработки и защиты персональных данных пользователей сайта MasterSell.",
};

export default function PrivacyPage() {
  return (
    <div className="antialiased text-slate-900 bg-white min-h-full flex flex-col">
      <Header />

      <main className="flex-1 py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-8">
            Политика конфиденциальности
          </h1>

          <p className="text-slate-600 mb-8 leading-relaxed">
            Настоящая Политика в отношении обработки персональных данных
            определяет порядок сбора, хранения, передачи и защиты персональных
            данных пользователей сайта{" "}
            <a
              href="https://mastersell.ru"
              className="text-brand-700 hover:underline"
            >
              MasterSell.ru
            </a>
            .
          </p>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3">1. Оператор персональных данных</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Оператором персональных данных является:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Название: [УКАЖИТЕ ИП / ООО / самозанятость]</li>
              <li>ИНН: [УКАЖИТЕ ИНН]</li>
              <li>ОГРН / ОГРНИП: [УКАЖИТЕ при наличии]</li>
              <li>Юридический / почтовый адрес: [УКАЖИТЕ АДРЕС]</li>
              <li>Email: [УКАЖИТЕ EMAIL]</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3">2. Какие данные собираются</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Мы обрабатываем только минимально необходимый объём данных:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>адрес электронной почты;</li>
              <li>имя и контактные данные, если вы добровольно указали их в форме;</li>
              <li>
                техническая информация: IP-адрес, данные cookies, сведения о
                браузере и устройстве, время посещения.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3">3. Цели обработки данных</h2>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>информирование о запуске сервиса и важных обновлениях;</li>
              <li>предоставление скидок и специальных предложений первым пользователям;</li>
              <li>ответы на вопросы и обратная связь;</li>
              <li>улучшение работы сайта и аналитика посещаемости.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3">4. Правовые основания обработки</h2>
            <p className="text-slate-600 leading-relaxed">
              Обработка персональных данных осуществляется на основании согласия
              субъекта персональных данных, выраженного при заполнении формы на
              сайте, в соответствии со статьёй 6 Федерального закона № 152-ФЗ «О
              персональных данных».
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3">5. Передача данных третьим лицам</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Для сбора заявок используется сервис «Яндекс.Формы» (оператор ООО
              «Яндекс»). Данные, отправленные через форму, хранятся на серверах
              Яндекса, расположенных на территории Российской Федерации, в
              соответствии с требованиями 152-ФЗ.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Мы не передаём персональные данные иным третьим лицам, за
              исключением случаев, предусмотренных законодательством РФ, или
              когда это необходимо для исполнения договора с пользователем.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3">6. Сроки хранения</h2>
            <p className="text-slate-600 leading-relaxed">
              Персональные данные хранятся до достижения целей обработки, отзыва
              согласия пользователем или до прекращения деятельности сервиса, но
              не дольше, чем это требуется для указанных целей.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3">7. Права пользователя</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              В соответствии с 152-ФЗ вы имеете право:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>получать информацию о том, какие данные о вас обрабатываются;</li>
              <li>уточнять, блокировать или удалять свои данные;</li>
              <li>отозвать согласие на обработку, направив запрос на email оператора;</li>
              <li>обжаловать действия оператора в Роскомнадзоре.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3">8. Cookies и технологии отслеживания</h2>
            <p className="text-slate-600 leading-relaxed">
              Сайт может использовать файлы cookie для корректной работы страниц
              и сбора обезличенной аналитики. Вы можете отключить cookie в
              настройках браузера, однако это может повлиять на функциональность
              сайта.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3">9. Меры защиты данных</h2>
            <p className="text-slate-600 leading-relaxed">
              Оператор принимает организационные и технические меры для защиты
              персональных данных от несанкционированного доступа, утраты,
              изменения или раскрытия.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3">10. Изменения политики</h2>
            <p className="text-slate-600 leading-relaxed">
              Оператор вправе вносить изменения в настоящую Политику. Актуальная
              версия всегда доступна по адресу{" "}
              <a
                href="https://mastersell.ru/privacy"
                className="text-brand-700 hover:underline"
              >
                mastersell.ru/privacy
              </a>
              .
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3">11. Контакты</h2>
            <p className="text-slate-600 leading-relaxed">
              По всем вопросам, связанным с обработкой персональных данных,
              пишите на email: [УКАЖИТЕ EMAIL].
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
