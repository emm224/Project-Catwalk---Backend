const { Pool } = require('pg');
const pool = new Pool({
  database: 'reviews',
  user: 'emm29776',
  password: 'postgres'
});

pool.connect();

module.exports = pool;

