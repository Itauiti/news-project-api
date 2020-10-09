const { isCelebrateError } = require('celebrate');
const CelebrateError = require('../errors/celebrate-error');

const celebrateParamsError = (err, req, res, next) => {
  if (isCelebrateError(err)) {
    next(new CelebrateError(`${Object.fromEntries(err.details).params.message}`));
  }
  return next();
};

const celebrateBodyError = (err, req, res, next) => {
  if (isCelebrateError(err)) {
    next(new CelebrateError(`${Object.fromEntries(err.details).body.message}`));
  }
  return next();
};

module.exports = {
  celebrateParamsError,
  celebrateBodyError,
};
