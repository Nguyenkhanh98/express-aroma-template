var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('blog', {banner: 'Our blog'});

});

module.exports = router;
