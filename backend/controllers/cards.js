const Card = require('../models/card.js');

const findCardHandler = (card, res) => {
  if (!card) {
    return res.status(404).json({ message: 'Нет карточки с таким id' });
  }
  return res.send({ data: card });
};

const catchErrorHandler = (err, res) => {
  if (err.name === 'CastError') {
    return res.status(404).json({ message: 'Нет карточки с таким id' });
  }
  if (err.name === 'ValidationError') {
    return res.status(400).json({ message: 'Переданные данные некорректны' });
  }
  return res.status(500).json({ message: err });
};

const getCards = (req, res) => {
  Card.find({})
    .populate('owner')
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((err) => {
      res.status(500).json({ message: err });
    });
};

const deleteCard = (req, res) => {
  Card.findById(req.params.cardId)
    .populate('owner')
    .then((card) => {
      const ownerId = card.owner._id.toString();
      if (ownerId !== req.user._id) {
        return res.status(404).send({ message: 'Вы не можете удалить чужую карточку' })
      }
      return Card.findByIdAndRemove(req.params.cardId);
    })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true })
    .then((card) => {
      findCardHandler(card, res);
    })
    .catch((err) => {
      catchErrorHandler(err, res);
    });
};

const unlikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true })
    .then((card) => {
      findCardHandler(card, res);
    })
    .catch((err) => {
      catchErrorHandler(err, res);
    });
};

module.exports = {
  getCards,
  deleteCard,
  createCard,
  likeCard,
  unlikeCard,
};
