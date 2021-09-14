const express = require('express');

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.render('category');
});

router.get('/:id', (req, res, next) => {
  res.render('single-product', { id: req.params.id });
});

module.exports = router;
