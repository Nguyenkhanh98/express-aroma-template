const express = require('express');
const router = express.Router();

router.get('/', async (req, res, next) => {
    var cart = await req.session.cart;
    res.locals.cart = await cart.getCart();
    console.log(res.locals.cart);
    res.render('cart');
});
router.post('/',(req, res, next)=>{
    var productId = req.body.id;

    console.log(req.session);

    var quantity = isNaN(req.body.quantity) ? 1 : req.body.quantity;
    var productController = require('../controllers/product');
    productController
    .getById(productId)
    .then(product =>{
        var cartItem = req.session.cart.add(product, productId, quantity);
        console.log(cartItem);
        res.json(cartItem);
    })
    .catch(error => next(error));
    console.log('post cart');
});
router.put('/',(req, res)=>{
    var productID = req.body.id;
    var quantity = parseInt(req.body.quantity);
    var cartItem = req.session.cart.update(productId, quantity);
    res.json(cartItem);
});
router.delete('/', (req, res)=>{
    var productId = req.body.id;
    req.session.cart.remove(productId);
    res.json({
        totalQuantity: req.session.cart.totalQuantity,
        totalPrice: req.session.cart.totalPrice
    });
}); 
router.delete('/all', (req, res)=>{
    req.session.cart.empty();
    res.sendStatus(204);
    res.end();
});

module.exports = router;