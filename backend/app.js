require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors, celebrate, Joi } = require('celebrate');
const appRouter = require('./routes/index');
const { login, createUser } = require('./controllers/users');
const { auth } = require('./middlewares/auth');
const { linkRegex, mailRegex } = require('./utils/regexp');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;

// Коннект к серверу;
mongoose.connect('mongodb://127.0.0.1:27017/mestodb')
  .then(() => {
    console.log('mongod connected');
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
app.use(express.json()); // Перевод данных в JSON через express;

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(cors());

app.use(requestLogger);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().pattern(mailRegex),
    password: Joi.string().required(),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(linkRegex),
    email: Joi.string().required().pattern(mailRegex),
    password: Joi.string().required(),
  }),
}), createUser);
app.use(auth);
app.use(appRouter);

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const errMessage = err.message || 'На сервере произошла ошибка';
  res.status(statusCode).send({ message: errMessage });
  next();
});

app.listen(PORT, () => {
  console.log('Сервер запущен'); // Проверка работы сервера при обновлении;
});
