const express = require('express');

const router = express.Router();
const brandController = require('../controllers/brand');
const categoryController = require('../controllers/categories');

/* GET users listing. */
router.get('/', async (req, res, next) => {
  const categories = await categoryController.getAll();
  const brands = await brandController.getAll();
  res.locals.categories = categories;
  res.locals.brands = brands;
  res.render('category');
});

router.get('/:id', (req, res, next) => {
  res.render('single-product', { id: req.params.id });
});

module.exports = router;
