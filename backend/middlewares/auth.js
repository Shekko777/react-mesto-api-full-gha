const jwt = require('jsonwebtoken');
const InvalidLogin = require('../errors/InvalidLogin');

const { JWT_SECRET } = process.env;

module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return next(new InvalidLogin('Необходима авторизация'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return next(new InvalidLogin('Необходима авторизация'));
  }

  req.user = payload;

  return next();
};
