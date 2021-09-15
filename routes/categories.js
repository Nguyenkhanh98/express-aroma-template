const express = require('express');
const categoryController = require('../controllers/categories');
const brandController = require('../controllers/brand');
const colorController = require('../controllers/color');
const productController = require('../controllers/product');

const router = express.Router();

/* GET users listing. */
router.get('/', async (req, res, next) => {
  try {
    const [categories, brands, colors, products] = await Promise.all(
      [categoryController.getAll(),
        brandController.getAll(),
        colorController.getAll(),
        productController.getAll()],
    );

    res.locals.categories = categories;
    res.locals.brands = brands;
    res.locals.colors = colors;
    res.locals.products = products;
    console.log(colors);
    res.render('category');
  } catch (error) {
    next(error);
  }
});

router.get('/:id', (req, res, next) => {
  res.render('single-product', { id: req.params.id });
});

module.exports = router;
