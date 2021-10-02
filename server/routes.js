let controller = require('./controllers');
let router = require('express').Router();

router.get('/qa', controller.QuestionsAndAnswers.get);

// Products API Endpoints
router.get('/products', controller.Products.getProducts);
router.get('/products/:product_id', controller.Products.getProductData);
router.get('/products/:product_id/styles', controller.Products.getProductStyle);
router.get('/products/:product_id/related', controller.Products.getRelated);
// router.get('/cart', controller.Products.getCart);
// router.post('/cart', controller.Products.saveCart);

router.get('/reviews', controller.reviews.getReviews);

module.exports = router;