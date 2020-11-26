const Card = require('../models/card.js');
const NotFoundError = require('../errors/not-found-err');
// const ValidationError = require('../errors/validation-error');
// const AuthError = require('../errors/auth-error');
// const ConflictError = require('../errors/conflict-error');
const ForbiddenError = require('../errors/forbidden-error');

const getCards = (req, res, next) => {
  Card.find({})
    .populate('owner')
    // .populate('likes')
    .then((data) => {
      res.send(data);
    })
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .populate('owner')
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Ошибка! Что-то пошло не так.');
      }
      return res.status(201).send(card);
    })
    .catch(next);
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .populate('owner')
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Ошибка! Что-то пошло не так.');
      }
      const ownerId = card.owner._id.toString();
      if (ownerId !== req.user._id) {
        throw new ForbiddenError('Вы не можете удалить чужую карточку');
      }
      return Card.findByIdAndRemove(req.params.cardId);
    })
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Ошибка! Что-то пошло не так.');
      }
      return res.status(200).send(card);
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true })
    .populate('owner')
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Ошибка! Что-то пошло не так.');
      }
      return res.status(200).send(card);
    })
    .catch(next);
};

const unlikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true })
    .populate('owner')
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Ошибка! Что-то пошло не так.');
      }
      return res.status(200).send(card);
    })
    .catch(next);
};

module.exports = {
  getCards,
  deleteCard,
  createCard,
  likeCard,
  unlikeCard,
};
