var models = require('../models')

module.exports = {
  getReviews: function (req, res) {
    models.reviews.getAll()
    .then( productReview => {
        res.json(productReview);
    })
    .catch(err => {
      res.send(400)
    })
  },

  getProductReviews: function (req, res) {
    models.reviews.getReview(req.query.product_id, req.query.pageNum, req.query.numReviews)
    .then( productReview => {
      res.json(productReview);
    })
    .catch(err => {
      res.send(400)
    })
  },

  getReviewMetadata: function (req, res) {

    models.reviews.getMetadata(req.query.product_id)
      .then( metaData => {
        res.json(metaData)
      })
      .catch( err => {
        res.send(400)
      })
  },

  postReview: function(req, res) {
    // console.log(req.body)
    models.reviews.postAReview(req.body)
      .then(() => {
        res.status(201).send('review created')
      })
      .catch(err => {
        console.log(err)
        res.send(err)
      })
  },

  markHelpful: function(req, res) {
    models.reviews.updateHelpful(req.params.review_id)
      .then(data => {
        res.sendStatus(200)
      })
      .catch(err => {
        console.log(err)
        res.sendStatus(400)
      })
  },

  markReported: function(req, res) {
    models.reviews.reported(req.params.review_id)
      .then(data => {
        res.sendStatus(200)
      })
      .catch(err => {
        res.sendStatus(400)
      })
  }


}