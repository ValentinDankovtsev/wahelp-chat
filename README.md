# 💬 Wahelp Chat Task

![Vue.js](https://img.shields.io/badge/vuejs-%2335495e.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Pinia](https://img.shields.io/badge/pinia-%23ffe05d.svg?style=for-the-badge&logo=pinia&logoColor=black)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

Красивый и функциональный SPA мессенджер, разработанный в рамках тестового задания. Реализован на Vue 3 с использованием Composition API и TypeScript.

> 🌐 **Website:** [https://valentindankovtsev.github.io/wahelp-chat/](https://valentindankovtsev.github.io/wahelp-chat/)

## ✨ Особенности

- 📱 **Адаптивный интерфейс**: Удобно работает как на десктопе, так и на мобильных устройствах.
- 🔄 **State Management**: Централизованное управление состоянием чатов через Pinia.
- 💾 **Сохранение данных**: История переписки и состояние сохраняются в `localStorage`.
- ⚡ **Мгновенный отклик**: Оптимистичный UI для отправки сообщений.
- 🤖 **Эмуляция собеседника**: Автоматические ответы ("эхо") для проверки входящих сообщений.
- 🎨 **Форматирование**: Поддержка **жирного** и _курсивного_ текста в сообщениях.
- 🔔 **Уведомления**: Индикаторы непрочитанных сообщений и статусы "в сети".
- ⌨️ **Удобный ввод**:
  - Автоматическое расширение поля ввода.
  - Отправка по `Enter`.
  - Перенос строки по `Shift + Enter`.

## 🛠 Технологический стек

- **Vue 3** (Script Setup, Composition API)
- **TypeScript** (Строгая типизация)
- **Pinia** (Store)
- **Vue Router** (Маршрутизация)
- **SCSS** (Стилизация)
- **Vite** (Сборщик)
- **GitHub Actions** (CI/CD деплой)

## 🚀 Запуск проекта

### Предварительные требования

- Node.js 20+
- npm

### Установка и запуск

1. **Клонируйте репозиторий:**

   ```bash
   git clone https://github.com/ValentinDankovtsev/Wahelp-chat.git
   cd Wahelp-chat
   ```

2. **Установите зависимости:**

   ```bash
   npm install
   ```

3. **Запустите режим разработки:**

   ```bash
   npm run dev
   ```

4. **Сборка для продакшена:**

   ```bash
   npm run build
   ```

5. **Запуск тестов:**
   ```bash
   npm run test:unit
   ```

## 📂 Структура проекта

```
src/
├── assets/          # Стили и статика
├── components/      # Vue компоненты
│   ├── chat/        # Компоненты чата (Header, List, Input, Bubble)
│   ├── ChatList.vue # Список чатов
│   └── ChatWindow.vue # Окно чата
├── composables/     # Переиспользуемая логика (Hooks)
├── router/          # Конфигурация маршрутизации
├── stores/          # Pinia хранилища
├── types/           # TypeScript интерфейсы
├── utils/           # Утилиты и хелперы
└── views/           # Страницы приложения
```

## 🌍 Деплой

Проект настроен на автоматический деплой в GitHub Pages через GitHub Actions.
Каждый пуш в ветку `master` запускает сборку и публикацию.

---

Created by Valentin Dankovtsev
