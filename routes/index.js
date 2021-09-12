var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/:page', function(req, res, next) {
  let banner = {
    blog: 'Our blog',
    category: 'Shop Category',
    cart: 'Shoping Cart',
    confirmation: 'Confirmation',
    checkout: 'Checkout',
    contact: 'Contact',
    login: 'Login',
    register: 'Register',
    'single-blog':'Single Blog',
    'single-product':'Single Product',
    'tracking-order': 'Tracking Order'
    
  }
  const page = req.params.page;

  res.render(page, {banner:banner[page] });
});

module.exports = router;
