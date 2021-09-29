const db = require('../../database').reviews;

module.exports = {
  getAll: function (callback) {
    db.query('SELECT * FROM reviews Limit 25', (err, reviewData) => {
      if(err) {
        callback(err)
      } else {
        callback(null, reviewData.rows)
      }
    });
  }
}



