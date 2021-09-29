let controller = require('./controllers');
let router = require('express').Router();

router.get('/qa', controller.questionsAndAnswers.get);

module.exports = router;