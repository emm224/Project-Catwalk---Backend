const { Pool } = require('pg');
const pool = new Pool({
  database: 'reviews',
  user: 'emm29776',
  password: 'postgres'
});

pool.connect();

pool.query('SELECT * FROM reviews Limit 5', (err, reviewData) => {
  if(err) {
    console.log(err)
  } else {
    console.log(reviewData)
  }
});

module.exports = pool;

