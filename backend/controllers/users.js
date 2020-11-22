const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');
const { SALT_ROUND, JWT_SECRET } = require('../configs/index.js');

const findUserHandler = (user, res) => {
  if (!user) {
    return res.status(404).send({ message: 'Нет пользователя с таким id' });
  }
  return res.status(200).send(user);
};

const catchErrorHandler = (err, res) => {
  if (err.name === 'CastError') {
    return res.status(404).json({ message: 'Нет пользователя с таким id' });
  }
  if (err.name === 'ValidationError') {
    return res.status(400).json({ message: 'Переданные данные некорректны' });
  }
  return res.status(500).json({ message: err });
};

const getUsers = (req, res) => {
  User.find({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
};

const getUser = (req, res) => {
  const { userId } = req.params;
  User.findOne({ _id: userId })
    .then((user) => {
      findUserHandler(user, res);
    })
    .catch((err) => {
      catchErrorHandler(err, res);
    });
};

const getUserInfo = (req, res) => {
  const id = req.user._id;
  if (!id) {
    return res.status(400).send({ message: 'Что-то пошло не так' });
  }
  User.findById(id)
  .then((user) => res.send(user))
  // .then(({ name, about, avatar, email }) => res.send({ name, about, avatar, email }))
  .catch((err) => {
    catchErrorHandler(err, res);
  });
};

const createUser = (req, res) => {
  const { name, about, avatar, email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ message: 'Введите e-mail и пароль' });
  }
  User.findOne({ email })
  .then((user) => {
    if (user) {
      return res.status(400).send({ message: 'Пользователь с таким email уже существует'});
    }
  })
  bcrypt.hash(password, SALT_ROUND)
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
    .catch((err) => {
      catchErrorHandler(err, res);
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ message: 'Введите e-mail и пароль' });
  }
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return res.status(401).send({ message: 'Неправильные почта или пароль' });
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return res.status(401).send({ message: 'Неправильные почта или пароль' });
          }
          return user;
        })
    })
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      return res.send({ token });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};

const updateProfile = (req, res) => {
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
      findUserHandler(user, res);
    })
    .catch((err) => {
      catchErrorHandler(err, res);
    });
};

const updateAvatar = (req, res) => {
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
      findUserHandler(user, res);
    })
    .catch((err) => {
      catchErrorHandler(err, res);
    });
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
