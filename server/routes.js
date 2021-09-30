let controller = require('./controllers');
let router = require('express').Router();

router.get('/qa', controller.questionsAndAnswers.get);
router.post('/qa', controller.questionsAndAnswers.post);

// Products API Endpoints
router.get('/products', controller.Products.get);

router.get('/reviews', controller.reviews.getReviews);

module.exports = router;