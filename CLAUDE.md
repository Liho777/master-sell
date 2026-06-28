# MasterSell — инструкции для разработки

Проект: `C:\Users\Sanni\myai\mastersell`
Репозиторий: https://github.com/Liho777/master-sell
Домены: `master-sell.ru`, `мастер-селл.рф` (punycode `xn----7sbpb4aab8ahdh.xn--p1ai`)

## Общие правила

- Работаем на **Next.js 16 App Router** + **TypeScript** + **Tailwind CSS 4**.
- Следуем существующему стилю кода, используем серверные компоненты по умолчанию, клиентские — только при необходимости.
- Все пути используем через алиас `@/`.
- `npm run build` должен проходить без ошибок перед каждым коммитом.
- Коммиты на английском, лаконичные, в формате: `Add ..., Fix ..., Update ..., Remove ...`.

## Архитектура и стек

### Фронтенд
- Next.js 16 (App Router, серверные компоненты по умолчанию).
- Tailwind CSS 4 с кастомной brand-палитрой `brand-50..brand-900`.
- UI-компоненты — собственные, без тяжёлых библиотек.
- Формы используют Server Actions (`useActionState`).

### Бэкенд / База данных
- **PostgreSQL на сервере в РФ**.
- ORM: **Prisma**.
- Авторизация: **самописная**, основанная на `bcrypt` и HTTP-only cookie-сессиях.
- Пароли хешируются через `bcrypt` (cost factor 12+).
- Сессии хранятся в cookie: подписанный `session_token`, UUID сессии в таблице `sessions`.
- Никаких внешних auth-сервисов (Supabase Auth, Firebase Auth, Auth0 и т.п.) не использовать.
- Никаких managed-BaaS за пределами РФ.

### AI
- **GigaChat API (Сбер)** — единственный AI-провайдер для MVP.
- Тексты: `GigaChat-2-Pro`, chat completions.
- Изображения: анализ фото через GigaChat Vision + генерация концептов. Финальную графику отдавать позже отдельным этапом.
- Переменные: `GIGACHAT_CREDENTIALS` (Base64 `client_id:client_secret`) или пара `GIGACHAT_CLIENT_ID` + `GIGACHAT_CLIENT_SECRET`.

### Хостинг / Инфраструктура
- Целевая площадка: **VDS SprintBox (sprintbox.ru)** от SprintHost.
- Все данные пользователей должны храниться **только на серверах в РФ**.
- Деплой: ручной через SSH + `git pull` + `npm install` + `npm run build` + PM2/Docker.
- Публичный лендинг ранее размещался на shared-хостинге SprintHost, но для SaaS-версии требуется VPS.

## Соответствие 152-ФЗ

- Персональные данные пользователей (email, имена, история генераций, фото товаров) не покидают РФ.
- GigaChat API работает внутри РФ.
- Яндекс.Форма на лендинге — данные на серверах Яндекса в РФ.
- Реквизиты оператора и полная оферта/политика будут заполнены после регистрации ИП.

## Структура проекта

```
mastersell/
  app/
    (marketing)/     # публичный лендинг (опционально)
    dashboard/       # личный кабинет
    generate/
      text/          # генерация SEO-текста
      image/         # концепт инфографики
    login/           # вход
    signup/          # регистрация
    logout/          # выход
    privacy/         # политика конфиденциальности
    offer/           # публичная оферта
    auth/callback/   # deprecated, удалить
    components/      # Header, Footer
  lib/
    prisma.ts        # единственный экземпляр PrismaClient
    gigachat.ts      # клиент GigaChat
    auth.ts          # хелперы сессий и паролей
  prisma/
    schema.prisma    # схема БД
  public/
  .env.example
```

## База данных (Prisma)

Таблицы:
- `users` — email, hashed_password, created_at
- `profiles` — расширение users (full_name, avatar_url)
- `sessions` — id, user_id, expires_at
- `projects` — проекты/карточки товаров пользователя
- `generations` — история генераций текста и изображений
- `subscriptions` — тариф пользователя

## Тарифы и лимиты

- `start`: 3 текста/день, 1 изображение/день
- `pro`: 100 текстов/день, 50 изображений/день
- `agency`: безлимит

## Домены

- В текстах сайта используем только `master-sell.ru` и `мастер-селл.рф`.
- Не использовать `mastersell.ru` (без дефиса).

## Что запрещено

- Managed Supabase / Firebase / Auth0 и аналогичные иностранные BaaS для персональных данных.
- Статический экспорт `output: "export"` — приложение должно работать в серверном режиме.
- Хранение паролей в plaintext или JWT в localStorage.
- Размещение БД за пределами РФ.
