const models = require('../models').questionsAndAnswers;

module.exports = {
  get: (req, res) => {
    models.get(req.query.product_id, (err, data) => {
      if (err) {
        res.status(404).end();
      } else {
        let result = {
          product_id: req.query.product_id,
          results: data
        }
        res.send(result);
      }
    })
  },

  post: (req, res) => {
    models.post((err, data) => {
      if (err) {
        res.status(418).end();
      } else {
        res.send(data.rows);
      }
    })
  }
}

