const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users.js');
const cardsRoutes = require('./routes/cards.js');
const unknownRoutes = require('./routes/unknown.js');
const { createUser, login } = require('./controllers/users.js');
const auth = require('./middlewares/auth.js');
const errorHandler = require('./middlewares/error-handler.js');
const { errors, celebrate, Joi } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
const PORT = 3000;

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser.json());

app.use(requestLogger);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

app.use(auth);
app.use('/', cardsRoutes);
app.use('/', userRoutes);
app.use('/', unknownRoutes);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT);


// {
//   "name": "xxx@mv.dd",
//   "link": "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png"
// }


// {
//   "name": "Жак-Ив Кусто",
//   "about": "Исследователь",
//   "avatar": "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png",
//   "_id": "5fb92debcb88f20915e0b557",
//   "email": "fuck@fuck.ru",
//   "__v": 0
// }

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmI5MmRlYmNiODhmMjA5MTVlMGI1NTciLCJpYXQiOjE2MDU5Nzg0NTgsImV4cCI6MTYwNjU4MzI1OH0.iLKxuYsXDDmG_6-dgyUJBGvWz8Wggx80LVDi-lN961k

// _______________________________________________________

// {
//   "email": "xxx@mail.xx",
//   "password": "11111111"
// }

// {
//   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmJhNzFiYTUxNGRlYzBjYjQyMDBmMDEiLCJpYXQiOjE2MDYwNTU5OTQsImV4cCI6MTYwNjY2MDc5NH0.gK6zkCtpI0Yftz2ZetpWfrRs16I6DDW8_9ncdZ_zprs"
// }