// Ошибки роутинга карточек
const cardValidationError = {
  statusCode: 400,
  message: 'Переданы некорректные данные',
};

const cardCastError = {
  statusCode: 400,
  message: 'Невалидный id карточки',
};

const cardNotValidId = {
  statusCode: 404,
  message: 'Карточка с указанным айди не найдена',
};

const cardDefaultError = {
  statusCode: 500,
  message: 'Ошибка по умолчанию',
};

// Ошибки роутинга пользователей
const userValidationError = {
  statusCode: '400',
  message: 'Переданы некорректные данные',
};

const userNotValidId = {
  statusCode: 404,
  message: 'Пользователь с указанным _id не найден',
};

// Ошибка по умолчанию
const defaultError = {
  statusCode: 500,
  message: 'Ошибка по умолчанию',
};

module.exports = {
  // Для карточек
  cardValidationError,
  cardCastError,
  cardNotValidId,
  cardDefaultError,

  // Для пользователей
  userValidationError,
  userNotValidId,

  // Ошибка по умолчанию
  defaultError,
};
