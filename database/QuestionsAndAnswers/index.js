const { Pool } = require('pg');
const pool = new Pool({database: 'questionsandanswers'});

pool.connect();

module.exports = pool;