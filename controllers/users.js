const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-error');
const AuthError = require('../errors/auth-error');
const devKey = require('../config');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.createUser = async (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name, email, password: hash,
    });
    res.send({
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findUserByCredentials(email, password);
    const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : devKey, { expiresIn: '7d' });
    res
      .cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: 'strict',
      });
    return res.send({ token });
  } catch (err) {
    next(new AuthError('Неверный логин или пароль'));
  }
};

module.exports.getUser = async (req, res, next) => {
  const userId = req.user._id;
  try {
    const user = await User.find({ _id: userId });
    if (user === null) {
      throw new NotFoundError('Нет пользователя с таким id');
    } else {
      return res.send(user);
    }
  } catch (err) {
    next(err);
  }
};
