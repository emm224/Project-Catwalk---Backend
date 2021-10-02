let controller = require('./controllers');
let router = require('express').Router();

router.get('/qa/questions', controller.questionsAndAnswers.getQuestions);
router.get('/qa/questions/:question_id/answers', controller.questionsAndAnswers.getAnswers);
router.post('/qa/questions', controller.questionsAndAnswers.postQuestion);
router.post('/qa/questions/:question_id/answers', controller.questionsAndAnswers.postAnswer);
router.put('/qa/questions/:question_id/helpful', controller.questionsAndAnswers.updateQuestionHelpful);
router.put('/qa/questions/:question_id/report', controller.questionsAndAnswers.updateQuestionReport);
router.put('/qa/answers/:answer_id/helpful', controller.questionsAndAnswers.updateAnswerHelpful);
router.put('/qa/answers/:answer_id/report', controller.questionsAndAnswers.updateAnswerReport);

// Products API Endpoints
router.get('/products', controller.Products.getProducts);
router.get('/products/:product_id', controller.Products.getProductData);
router.get('/products/:product_id/styles', controller.Products.getProductStyle);
router.get('/products/:product_id/related', controller.Products.getRelated);
// router.get('/cart', controller.Products.getCart);
// router.post('/cart', controller.Products.saveCart);

router.get('/reviewsList', controller.reviews.getReviews);

router.get('/reviews', controller.reviews.getProductReviews);

router.get('/reviews/meta', controller.reviews.getReviewMetadata);

router.post('/reviews', controller.reviews.postReview)

router.put('/reviews/:review_id/helpful', controller.reviews.markHelpful)

router.put('/reviews/:review_id/report', controller.reviews.markHelpful)


module.exports = router;