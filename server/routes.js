let controller = require('./controllers');
let router = require('express').Router();

router.get('/qa', controller.QuestionsAndAnswers.get);

module.exports = router;