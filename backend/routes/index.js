const router = require('express').Router();
const usersRouter = require('./users');
const cardsRouter = require('./cards');

router.use(usersRouter);
router.use(cardsRouter);
router.all('/*', (req, res) => {
  res.status(404).send({ message: 'Ресурc не найден' });
});

module.exports = router;
