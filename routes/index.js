const allRouters = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { celebrateParamsError } = require('../middlewares/celebrateErrorsHandler');
const articlesRouter = require('./articles');
const usersRouter = require('./users');
const auth = require('../middlewares/auth');
const { createUser, login } = require('../controllers/users');
const NotFoundError = require('../errors/not-found-error');
const { notFoundUrlErrorMessege } = require('../errors/errors-messeges-rus');

allRouters.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), celebrateParamsError, login);
allRouters.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), celebrateParamsError, createUser);
allRouters.use('/users', auth, usersRouter);
allRouters.use('/articles', auth, articlesRouter);
allRouters.use((req, res, next) => {
  next(new NotFoundError(notFoundUrlErrorMessege));
});

module.exports = allRouters;
