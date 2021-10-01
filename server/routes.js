let controller = require('./controllers');
let router = require('express').Router();

router.get('/qa', controller.questionsAndAnswers.get);

// Products API Endpoints
router.get('/products', controller.Products.get);

router.get('/reviewsList', controller.reviews.getReviews);

router.get('/reviews', controller.reviews.getProductReviews);

router.get('/reviews/meta', controller.reviews.getReviewMetadata);

module.exports = router;