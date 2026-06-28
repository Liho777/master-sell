# MasterSell

Сервис для генерации SEO-текстов и AI-концептов инфографики для карточек товаров на маркетплейсах Wildberries, Ozon и Яндекс.Маркет.

## Технологии

- Next.js 16 (App Router)
- React 19 + TypeScript
- Tailwind CSS 4
- Prisma 7 + PostgreSQL
- GigaChat API (Сбер) — AI-провайдер

## Локальная разработка на Windows

### 1. Установите PostgreSQL

1. Скачайте установщик с https://www.postgresql.org/download/windows/
2. Установите PostgreSQL 16+. В процессе запомните пароль суперпользователя `postgres`.
3. Убедитесь, что `psql` добавлен в PATH (обычно `C:\Program Files\PostgreSQL\16\bin`).

### 2. Создайте базу данных

Откройте PowerShell или CMD и выполните:

```bash
psql -U postgres -f scripts/init-db.sql
```

Введите пароль суперпользователя `postgres`.

Это создаст:
- пользователя `mastersell`
- базу `mastersell`

### 3. Настройте переменные окружения

Создайте файл `.env.local` в корне проекта:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
DATABASE_URL=postgresql://mastersell:mastersell_dev_pass@localhost:5432/mastersell

# GigaChat API (Sber)
# Authorization key = Base64(client_id:client_secret), или укажите пару ID + SECRET
GIGACHAT_CREDENTIALS=your_base64_client_id_client_secret
# или
GIGACHAT_CLIENT_ID=your_gigachat_client_id
GIGACHAT_CLIENT_SECRET=your_gigachat_client_secret
```

### 4. Установите зависимости

```bash
npm install
```

### 5. Примените миграции Prisma

```bash
npm run db:migrate
```

При первом запуске введите имя миграции, например: `init`

### 6. Запустите dev-сервер

```bash
npm run dev
```

Откройте http://localhost:3000

## Полезные команды

```bash
npm run dev          # dev-сервер
npm run build        # production-сборка
npm run db:migrate   # новая миграция Prisma
npm run db:generate  # перегенерировать клиент Prisma
npm run db:studio    # визуальный редактор базы
```

## Архитектура авторизации

- Пароли хешируются `bcrypt`.
- Сессии хранятся в HTTP-only cookie `session_token`.
- Проверка сессии происходит в `proxy.ts` (Next.js 16) и в `lib/auth.ts`.
- Никаких внешних auth-сервисов не используется.

## Требования 152-ФЗ

- Все персональные данные пользователей хранятся в PostgreSQL на сервере в РФ.
- AI-провайдер — GigaChat API (Сбер), работает внутри РФ.
- Форма waitlist на лендинге — Яндекс.Формы, данные в РФ.

## Продакшн

Целевая инфраструктура: VDS **SprintBox** (sprintbox.ru) — российский хостинг.
Инструкция по продакшн-деплою будет добавлена позже.

## Заметки

- Реквизиты оператора в `app/privacy/page.tsx` и `app/offer/page.tsx` заполняются после регистрации ИП.
- Домены проекта: `master-sell.ru` и `мастер-селл.рф`.
