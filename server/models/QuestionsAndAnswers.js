const db = require('../../database').questionsAndAnswers;

module.exports = {
  get: callback => {
    let queryString = 'SELECT * FROM answers_photos LIMIT 25';
    db.query(queryString, (err, result) => {
      callback(err, result);
    })
  }
}