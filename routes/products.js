const express = require('express');

const router = express.Router();
const brandController = require('../controllers/brand');
const categoryController = require('../controllers/categories');
const colorController = require('../controllers/color');
const productController = require('../controllers/product');

/* GET users listing. */
router.get('/', async (req, res, next) => {
  try {
    if (req.query) {
      if (req.query.category && (isNaN(req.query.category) || req.query.category === '0')) {
        req.query.category = null;
      }
      if (req.query.brand && (isNaN(req.query.brand) || req.query.brand === '0')) {
        req.query.brand = null;
      }
      if (req.query.color && (isNaN(req.query.color) || req.query.color === '0')) {
        req.query.color = null;
      }

      if (req.query.min && (isNaN(req.query.min))) {
        req.query.min = 0;
      }
      if (req.query.max && (isNaN(req.query.max))) {
        req.query.max = 100;
      }
    }

    const [categories, brands, colors, products] = await Promise.all(
      [categoryController.getAll(req.query),
        brandController.getAll(req.query),
        colorController.getAll(req.query),
        productController.getAll(req.query)],
    );

    res.locals.categories = categories;
    res.locals.brands = brands;
    res.locals.colors = colors;
    res.locals.products = products;
    res.render('category');
  } catch (error) {
    console.log(error);

    res.send(error);
  }
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  const product = await productController.getById(id);
  res.locals.product = product;
  res.render('single-product');
});

module.exports = router;
