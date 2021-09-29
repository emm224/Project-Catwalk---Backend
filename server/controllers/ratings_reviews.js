var models = require('../models')

module.exports = {
  getReviews: function (req, res) {
    models.reviews.getAll((err, productReview) => {
      if (err) {
        res.send(400 + ' Product Reviews was not found');
      } else {
        res.json(productReview);
      }
    })
  }
}