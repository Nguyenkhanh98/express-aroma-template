const express = require('express');

const router = express.Router();
const brandController = require('../controllers/brand');
const categoryController = require('../controllers/categories');
const productController = require('../controllers/product');

/* GET users listing. */
router.get('/', async (req, res, next) => {
  const categories = await categoryController.getAll();
  const brands = await brandController.getAll();
  res.locals.categories = categories;
  res.locals.brands = brands;
  res.render('category');
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  const product = await productController.getById(id);
  res.locals.product = product;
  res.render('single-product');
});

module.exports = router;
