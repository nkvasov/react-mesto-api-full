require('dotenv').config();
const { NODE_ENV, JWT_SECRET } = process.env;
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users.js');
const cardsRoutes = require('./routes/cards.js');
const unknownRoutes = require('./routes/unknown.js');
const cors = require('cors');
const { createUser, login } = require('./controllers/users.js');
const auth = require('./middlewares/auth.js');
const errorHandler = require('./middlewares/error-handler.js');
const { errors, celebrate, Joi } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use('*', cors());

app.use(bodyParser.json());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

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

