const express = require('express');

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.render('blog', { banner: 'Our blog' });
});

module.exports = router;
