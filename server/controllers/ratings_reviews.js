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
  },

  getProductReviews: function (req, res) {
    models.reviews.getReview(req.query.product_id, req.query.pageNum, req.query.numReviews, (err, productReview) => {
      if (err) {
        res.send(400 + ' Product Reviews was not found');
      } else {
        res.json(productReview);
      }
    })
  },

  getReviewMetadata: function (req, res) {

    models.reviews.getMetadata(req.query.product_id, (err, productReview) => {
      if (err) {
        res.send(400 + ' Product Review Meta Data was not found');
      } else {
        res.json(productReview);
      }
    })

  }
}