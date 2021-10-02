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
router.get('/products', controller.Products.get);

router.get('/reviews', controller.reviews.getReviews);

module.exports = router;