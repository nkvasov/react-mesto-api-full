const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../configs/index.js');

const auth = (req, res, next) => {
  const { authorization: token} = req.headers;
  if (!token) {
    return res.status(401).send({ message: 'Необходима авторизация' });
  }
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return res.status(401).send({ message: 'Необходима авторизация' });
  }

  req.user = payload;
  next();
};

module.exports = auth;
