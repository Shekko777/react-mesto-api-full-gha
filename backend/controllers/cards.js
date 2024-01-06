const cardModel = require('../models/card'); // Модель карты
// Ошибки
const ValidationError = require('../errors/ValidationError');
const NotValidId = require('../errors/NotValidId');
const Forbidden = require('../errors/Forbidden');

// Получить карточки;
module.exports.getCards = (req, res, next) => {
  cardModel.find()
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch(next);
};

// Создать карточку;
module.exports.createCard = (req, res, next) => {
  cardModel.create({ name: req.body.name, link: req.body.link, owner: req.user._id })
    .then((card) => {
      res.status(201).send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

// Удалить карточку;
module.exports.deleteCard = async (req, res, next) => {
  cardModel.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        return next(new NotValidId('Карточка с указанным id не найдена'));
      }
      if (card.owner.toString() === req.user._id) {
        return cardModel.findByIdAndDelete(req.params.cardId)
          .then((deletedCard) => {
            res.status(200).send({ deletedCard });
          })
          .catch((err) => {
            if (err.name === 'CastError') {
              next(new ValidationError('Невалидный id карточки'));
            } else if (err.message === 'notValidId') {
              next(new NotValidId('Карточка с указанным id не найдена'));
            } else {
              next(err);
            }
          });
      }

      return next(new Forbidden('Отказано в доступе'));
    })
    .catch(next);
};

// Поставить лайк;
module.exports.likeCard = (req, res, next) => {
  cardModel.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new Error('notValidId'))
    .then((card) => {
      res.status(200).send({ card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Невалидный id карточки'));
      } else if (err.message === 'notValidId') {
        next(new NotValidId('Карточка с указанным айди не найдена'));
      } else {
        next(err);
      }
    });
};

// Удалить лайк карточки;
module.exports.unlikeCard = (req, res, next) => {
  cardModel.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new Error('notValidId'))
    .then((card) => {
      res.status(200).send({ card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Невалидный id карточки'));
      } else if (err.message === 'notValidId') {
        next(new NotValidId('Карточка с указанным айди не найдена'));
      } else {
        next(err);
      }
    });
};
