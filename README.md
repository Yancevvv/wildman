# Flashcard App - Установка и запуск

## Структура проекта

wildmanFront/
└── wildman/
    ├── src/
    │   ├── components/
    │   │   ├── DecksPage.jsx
    │   │   ├── CreateDeck.jsx
    │   │   ├── ChatPage.jsx
    │   │   ├── SignIn.jsx
    │   │   ├── Auth.jsx
    │   │   ├── HomePage.jsx
    │   │   ├── EditDeck.jsx
    │   │   └── FlipCards.jsx
    │   ├── App.js
    │   └── index.js
    ├── package.json
    └── README.md

## Установка зависимостей

1. Перейдите в директорию проекта:
cd wildmanFront/wildman

2. Установите основные зависимости:
npm install

3. Установите axios для работы с API:
npm install axios

## Запуск приложения

1. Запустите фронтенд-приложение:
npm start

Приложение будет доступно по адресу: http://localhost:3000

## Основные команды

- `npm start` - запуск dev-сервера
- `npm install` - установка зависимостей
- `npm install axios` - установка библиотеки для HTTP-запросов
- `npm run build` - сборка production версии

## Настройка API

Убедитесь, что бэкенд-сервер запущен и доступен по адресу, указанному в запросах axios.

Приложение использует следующие API endpoints:
- GET /api/decks - получение списка колод
- POST /api/decks - создание новой колоды
- PUT /api/decks/{deckId} - редактирование колоды
- GET /api/decks/{deckId}/cards - получение карточек колоды
- POST /api/decks/{deckId}/cards - добавление карточки
- PUT /api/decks/{deckId}/cards/{cardId} - редактирование карточки
- DELETE /api/decks/{deckId}/cards/{cardId} - удаление карточки
