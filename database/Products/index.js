const { Pool } = require('pg');
const pool = new Pool({ database: 'productsapi' });
pool.connect()
  .then(() => {
    console.log('Connection established');
  })
  .catch(error => {
    console.error(error);
  })

module.exports = pool;