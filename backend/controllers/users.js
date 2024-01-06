require('dotenv').config();
const bcrypt = require('bcrypt'); // Для хеширования паролей
const jwt = require('jsonwebtoken'); // Для создания токена
const userModel = require('../models/user'); // Модель пользователя
// Ошибки
const ValidationError = require('../errors/ValidationError');
const NotValidId = require('../errors/NotValidId');
const BusyEmail = require('../errors/BusyEmail');
const InvalidLogin = require('../errors/InvalidLogin');

// Секретный ключ для JWT из корневого .env
const { JWT_SECRET } = process.env;

// Регистрация;
module.exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => userModel.create({
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar,
      email: req.body.email,
      password: hash,
    }))
    .then((user) => {
      res.status(200).send({
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Переданы некорректные данные'));
      } else if (err.code === 11000) {
        next(new BusyEmail('Пользователь с таким Email уже существует'));
      }
      next(err);
    });
};

// Логин
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  userModel.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new InvalidLogin('Неправильный email или пароль');
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw new InvalidLogin('Неправильный email или пароль');
        }

        return user;
      });
    })
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      res.cookie('jwt', token, {
        maxAge: 3600000,
        httpOnly: true,
      });
      req.headers.authorization = token;
      res.status(200).send({ jwt: token });
    })
    .catch(next);
};

// Получить всех пользователей;
module.exports.getUsers = (req, res, next) => {
  userModel.find()
    .then((users) => {
      res.send(users);
    })
    .catch(next);
};

// Получить пользователя по ID;
module.exports.getUserById = (req, res, next) => {
  const { id } = req.params;

  userModel.findById(id)
    .orFail(new Error('notValidId'))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Переданы некорректные данные'));
      } else if (err.message === 'notValidId') {
        next(new NotValidId('Пользователь с указанным _id не найден'));
      } else {
        next(err);
      }
    });
};

// Получить информацию о пользователе
module.exports.getMeInfo = (req, res, next) => {
  userModel.findOne({ _id: req.user })
    .then((user) => {
      if (!user) {
        throw new Error('notUserId');
      }
      res.status(200).send({ user });
    })
    .catch((err) => {
      if (err.message === 'notUserId') {
        next(new NotValidId('Пользователь с указанным _id не найден'));
      } else {
        next(err);
      }
    });
};

// Обновление профиля;
module.exports.changeUserProfile = (req, res, next) => {
  userModel.findByIdAndUpdate(
    req.user._id,
    { name: req.body.name, about: req.body.about },
    { new: true, runValidators: true },
  )
    .orFail(new Error('notValidId'))
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Переданы некорректные данные'));
      } else if (err.message === 'notValidId') {
        next(new NotValidId('Пользователь с указанным _id не найден'));
      } else {
        next(err);
      }
    });
};

// Обновление аватара;
module.exports.changeUserAvatar = (req, res, next) => {
  userModel.findByIdAndUpdate(
    req.user._id,
    { avatar: req.body.avatar },
    { new: true, runValidators: true },
  )
    .orFail(new Error('notValidId'))
    .then((user) => {
      res.status(200).send({ avatar: user.avatar });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Переданы некорректные данные'));
      } else if (err.message === 'notValidId') {
        next(new NotValidId('Пользователь с указанным _id не найден'));
      } else {
        next(err);
      }
    });
};
