const express = require('express');
const database = require('../database/models');
const productController = require('../controllers/product');
const categoryController = require('../controllers/product');

const router = express.Router();

/* GET home page. */
router.get('/', async (req, res, next) => {
  try {
    const categories = await categoryController.getAll();
    const trendingProducts = await productController.getTrendingProducts();
    res.locals.categories = categories;
    res.locals.trendingProducts = trendingProducts;
    res.render('index');
  } catch (error) {
    next(error);
  }
});

router.get('/sync', (req, res, next) => {
  database.sequelize.sync();

  res.send('sync db successfully');
});

router.get('/:page', (req, res, next) => {
  const banner = {
    blog: 'Our blog',
    category: 'Shop Category',
    cart: 'Shoping Cart',
    confirmation: 'Confirmation',
    checkout: 'Checkout',
    contact: 'Contact',
    login: 'Login',
    register: 'Register',
    'single-blog': 'Single Blog',
    'single-product': 'Single Product',
    'tracking-order': 'Tracking Order',

  };
  const { page } = req.params;

  res.render(page, { banner: banner[page] });
});

module.exports = router;
