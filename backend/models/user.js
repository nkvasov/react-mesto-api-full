const { Schema, model } = require('mongoose');
const validator = require('validator');

const userSchema = new Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator(v) {
        const regex = /^https?:\/\/(www\.)?[^а-яё\s]{3,}#?$/;
        return regex.test(v);
      },
      message: 'Что за адрес такой?',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: 'Введите валидный e-mail, пожалуйста',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  }
});

module.exports = model('user', userSchema);
