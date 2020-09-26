const { isCelebrateError } = require('celebrate');

const errorsHandler = (err, req, res, next) => {
  let { statusCode = 500, message } = err;
  if (isCelebrateError(err)) {
    statusCode = 400;
    message = `${Object.fromEntries(err.details).body.message}`;
  }
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = `${Object.values(err.errors).map((error) => error.message).join(', ')}`;
  }
  if (err.name === 'CastError') {
    statusCode = 400;
    message = 'Ошибка валидации ID';
  }
  if (err.code === 11000 && err.name === 'MongoError') {
    statusCode = 409;
    message = 'Такой пользователь уже существует';
  }
  res.status(statusCode).send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });
  next();
};

module.exports = errorsHandler;
