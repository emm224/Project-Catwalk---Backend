const db = require('./../../database').Products;

module.exports = {
  getProducts: () => {
    const query = 'SELECT * FROM products LIMIT 25';
    return new Promise((resolve, reject) => {
      db.query(query, (error, data) => {
        if (error) reject(error);
        resolve(data)
      })
    })
  }
}

