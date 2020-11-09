const jwt = require('jsonwebtoken');
const { devKey } = require('../config');
const AuthError = require('../errors/auth-error');
const { authNeedErrorMessege } = require('../errors/errors-messeges-rus');

const { NODE_ENV, JWT_SECRET } = process.env;

function auth(req, res, next) {
  const token = req.cookies.jwt;

  if (!token) {
    return next(new AuthError(authNeedErrorMessege));
  }

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : devKey);
  } catch (err) {
    return next(new AuthError(authNeedErrorMessege));
  }

  req.user = payload;

  return next();
}

module.exports = auth;
