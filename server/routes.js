let controller = require('./controllers');
let router = require('express').Router();

router.get('/qa', controller.questionsAndAnswers.get);

router.get('/reviews', controller.reviews.getReviews);

module.exports = router;