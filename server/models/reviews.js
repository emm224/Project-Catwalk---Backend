const db = require('../../database').Reviews;

module.exports = {
  getAll: function (callback) {
    db.query('SELECT * FROM reviews Limit 5', (err, reviewData) => {
      if(err) {
        console.log(err)
      } else {
        console.log(reviewData.rows)
      }
    });
  }
}



