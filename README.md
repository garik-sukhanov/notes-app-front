# Notes App — Frontend

Фронтенд приложения для управления заметками. SPA на React + Vite с поддержкой авторизации, защищёнными маршрутами и Docker-окружением.


### ВАРИАНТЫ БЫСТРОГО ЗАПУСКА
Предварительно переименуйте файл .env.example в .env что бы URL бэкенда был задан корректно.

1.  Потребуется только установленный на компьютер Docker

- `yarn docker:dev:build`
- `yarn docker:dev:start`

2.  Потребуется установленный Node.js и Yarn

- `yarn install`
- `yarn dev`

или с npm:

- `npm install`
- `npm run dev`



### ОПИСАНИЕ ПРОЕКТА
---

## Стек технологий

| Категория | Технологии |
|---|---|
| **UI** | React 19, React Router DOM v7 |
| **Стили** | Styled Components |
| **Запросы** | TanStack React Query v5, Axios |
| **Формы** | React Hook Form + Zod |
| **Сборка** | Vite 6, TypeScript 5.8 |
| **Тесты** | Vitest, Testing Library |
| **Линтинг** | ESLint 9, Prettier |
| **Docker** | Docker Compose (dev / prod) |

---

## Функционал

- 🔐 **Авторизация** — регистрация и вход (JWT)
- 🔒 **Защищённые маршруты** — с редиректом на логин
- 📝 **Заметки** — просмотр и управление заметками пользователя
- 👥 **Пользователи** — страница списка пользователей
- ⚡ **Кэш запросов** — через React Query с devtools
- 🧪 **Тесты** — unit и интеграционные тесты

---

## Быстрый старт

### 1. Переменные окружения

Скопируйте файл с примером и задайте URL бэкенда:

```bash
cp example.env .env
```

По умолчанию: `VITE_API_BASE_URL=http://localhost:3000`

---

### Запуск
### 🚀 Docker — продакшн

Оптимизированная сборка через Nginx:

```bash
# Первый запуск (сборка образа)
yarn docker:prod:build

# Запуск в фоне
yarn docker:prod:start

# Остановка
yarn docker:prod:stop
```

Откройте: [http://localhost](http://localhost)

---

## Прочие команды

```bash
yarn lint          # Линтинг и автоисправление
yarn format        # Форматирование кода (Prettier)
yarn test          # Запуск тестов
yarn test:watch    # Тесты в watch-режиме
yarn test:coverage # Отчёт покрытия
```

---

## Структура проекта

```
src/
├── app/          # Роутер, провайдеры, лейауты
├── features/     # Фичи: auth, notes, users
└── shared/       # Компоненты, хуки, утилиты, модели
```
