const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users.js');
const cardsRoutes = require('./routes/cards.js');
const unknownRoutes = require('./routes/unknown.js');
const { createUser, login } = require('./controllers/users.js');

const app = express();
const PORT = 3000;

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser.json());
app.post('/signup', createUser);
app.post('/signin', login);
app.use((req, res, next) => {
  req.user = {
    _id: '5f9f0566bb9c8e18661c7a05',
  };

  next();
});
app.use('/', userRoutes);
app.use('/', cardsRoutes);
app.use('/', unknownRoutes);

app.listen(PORT);
