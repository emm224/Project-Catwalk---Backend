const model = require('../models').Products;

module.exports = {
  get: (req, res) => {
    model.getProducts()
      .then(data => {
        res.send(data.rows);
      })
      .catch(error => {
        res.statusCode(404);
      })
  }
}