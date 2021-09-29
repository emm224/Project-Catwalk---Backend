const models = require('../models').QuestionsAndAnswers;

module.exports = {
  get: (req, res) => {
    models.get((err, data) => {
      if (err) {
        res.status(418).end();
      } else {
        res.send(data.rows);
      }
    })
  }
}

