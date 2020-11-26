const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');
const { SALT_ROUND, JWT_SECRET } = require('../configs/index.js');
const NotFoundError = require('../errors/not-found-err');
const ValidationError = require('../errors/validation-error');
const AuthError = require('../errors/auth-error');
const ConflictError = require('../errors/conflict-error');

const getUsers = (req, res) => {
  User.find({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
};

const getUser = (req, res, next) => {
  const { userId } = req.params;
  User.findOne({ _id: userId })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Нет пользователя с таким id');
      }
      return res.status(200).send(user);
    })
    .catch(next);
};

const getUserInfo = (req, res, next) => {
  const id = req.user._id;
  if (!id) {
    throw new AuthError('Ошибка авторизации');
  }
  User.findById(id)
    .then((user) => res.status(200).send(user))
    .catch(next);
};

const createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;

  if (!email || !password) {
    throw new ValidationError('Введите e-mail и пароль')
  }
  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ConflictError('Пользователь с таким email уже существует');
      }
      return bcrypt.hash(password, SALT_ROUND);
    })
    .then((hash) => {
      return User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      })
    })
    .then((user) => {
      res.send(user);
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  console.log(email);

  if (!email || !password) {
    throw new ValidationError('Введите e-mail и пароль');
  }
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new AuthError('Неправильные почта или пароль');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new AuthError('Неправильные почта или пароль');
          }
          return user;
        })
    })
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      return res.send({ token });
    })
    .catch(next);
};

const updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        throw new Error();
      }
      res.status(200).send(user);
    })
    .catch(next);
};

const updateAvatar = (req, res, next) => {
  const { link } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { link },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        throw new Error();
      }
      res.status(200).send(user);
    })
    .catch(next);
};

module.exports = {
  getUsers,
  getUser,
  getUserInfo,
  createUser,
  updateAvatar,
  updateProfile,
  login,
};
