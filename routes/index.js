const allRouters = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const articlesRouter = require('./articles');
const usersRouter = require('./users');
const auth = require('../middlewares/auth');
const { createUser, login } = require('../controllers/users');
const NotFoundError = require('../errors/not-found-error');

allRouters.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);
allRouters.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), createUser);
allRouters.use('/users', auth, usersRouter);
allRouters.use('/articles', auth, articlesRouter);
allRouters.use((req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

module.exports = allRouters;
