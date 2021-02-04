# news-project-api

## О проекте:
Дипломный проект в ЯндексПрактикуме (бэкэнд)

## Основной функционал: 
1. Создан сервер, подключены сертификаты, размещен проект
2. Работа с БД - MongoDB
4. Валидируются данные до добавления в базу
5. Централизованная обработка ошибок, сбор логов
6. Реализовано секретное хранение ключей в process.env (для продакт)
7. Привязано доменное имя
8. Роуты: 
- GET /users/me возвращает информацию о пользователе (email и имя);
- GET /articles — все сохранённые пользователем статьи;
- POST /articles создаёт статью с переданными в теле данными;
- DELETE /articles/articleId удаляет сохранённую статью по _id
- POST /signup создаёт пользователя с переданными в теле данными;
- POST /signin возвращает JWT, если в теле запроса переданы правильные почта и пароль.

## Доменное имя:
api.newsforyouproject.ru (wwww.api.newsforyouproject.ru)
СЕРВЕР ОСТАНОВЛЕН

## Публичный IP-адрес:
130.193.56.169
СЕРВЕР ОСТАНОВЛЕН

## Стэк технологий:
Node.js, express.js, MongoDBб

## Пакеты, которые используются в проекте:
- [body-parser](https://www.npmjs.com/package/body-parser)
- [express](https://expressjs.com)
- [celebrate](https://www.npmjs.com/package/celebrate)
- [validator](https://www.npmjs.com/package/validator)
- [helmet](https://helmetjs.github.io/)
- [express-rate-limit](https://www.npmjs.com/package/express-rate-limit)
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [mongoose](https://www.npmjs.com/package/mongoose)
- [cookie-parser](https://www.npmjs.com/package/cookie-parser)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [winston](https://www.npmjs.com/package/winston)
- [express](https://www.npmjs.com/package/express)
- [express-rate-limit](https://www.npmjs.com/package/express-rate-limit)
- [express-winston](https://www.npmjs.com/package/express-winston)
- [joi-objectid](https://www.npmjs.com/package/joi-objectid)

## Инструкции по запуску:
- Скачать или склонировать репозитори
- Установить зависимости при помощи npm - `npm i`
- Подключиться к mongo `npm i mongoose`
- Запустить сервер на localhost:3000 - `npm run start`
