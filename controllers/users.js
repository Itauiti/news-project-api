const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-error');
const AuthError = require('../errors/auth-error');
const ValidationError = require('../errors/validation-error');
const AlreadyExistsError = require('../errors/already-exists-error');
const { alreadyExistsErrorMessege, loginErrorMessege, notFoundUserErrorMessege } = require('../errors/errors-messeges-rus');
const { devKey } = require('../config');

const { NODE_ENV, JWT_SECRET } = process.env;

async function createUser(req, res, next) {
  const {
    name, email, password,
  } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name, email, password: hash,
    });
    return res.send({
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new ValidationError(`${Object.values(err.errors).map((error) => error.message).join(', ')}`));
    }
    if (err.code === 11000 && err.name === 'MongoError') {
      next(new AlreadyExistsError(alreadyExistsErrorMessege));
    }
    return next(err);
  }
}

async function login(req, res, next) {
  const { email, password } = req.body;
  try {
    const user = await User.findUserByCredentials(email, password);
    const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : devKey, { expiresIn: '7d' });
    res
      .cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: false,
      });

    return res.send({ token, name: user.name });
  } catch (err) {
    return next(new AuthError(loginErrorMessege));
  }
}

async function getUser(req, res, next) {
  const userId = req.user._id;
  try {
    const user = await User.find({ _id: userId });
    if (user === null) {
      throw new NotFoundError(notFoundUserErrorMessege);
    } else {
      return res.send(user);
    }
  } catch (err) {
    return next(err);
  }
}

async function logoutUser(req, res, next) {
  const userId = req.user._id;
  try {
    const user = await User.find({ _id: userId });
    if (user === null) {
      throw new NotFoundError(notFoundUserErrorMessege);
    } else {
      res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
      });
      return res.send(user);
    }
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  createUser,
  login,
  getUser,
  logoutUser,
};
