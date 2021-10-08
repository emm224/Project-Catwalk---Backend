let controller = require('./controllers');
let router = require('express').Router();

router.get('/reviewsList', controller.reviews.getReviews);

router.get('/reviews', controller.reviews.getProductReviews);

router.get('/reviews/meta', controller.reviews.getReviewMetadata);

router.post('/reviews', controller.reviews.postReview)

router.put('/reviews/:review_id/helpful', controller.reviews.markHelpful)

router.put('/reviews/:review_id/report', controller.reviews.markHelpful)


module.exports = router;