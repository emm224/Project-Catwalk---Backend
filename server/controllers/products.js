const model = require('../models').Products;

module.exports = {
  getProducts: (req, res) => {
    const count = req.query.count || 5;
    const page = req.query.page || 1;
    model.getProducts(count, page)
      .then(data => {
        res.send(data);
      })
      .catch(error => {
        res.sendStatus(404);
      })
  },
  getProductData: (req, res) => {
    const id = req.params.product_id;
    model.getProductData(id)
      .then(data => {
        res.send(data);
      })
      .catch(error => {
        res.sendStatus(404);
      })
  },
  getProductStyle: (req, res) => {
    const id = req.params.product_id;
    model.getProductStyle(id)
      .then(data => {
        res.send(data);
      })
      .catch(error => {
        res.sendStatus(404);
      })
  },
  getRelated: (req, res) => {
    const id = req.params.product_id;
    model.getRelated(id)
      .then(data => {
        res.send(data);
      })
      .catch(error => {
        res.sendStatus(404);
      })
  },
  // getCart: (req, res) => {
  //   console.log(req)
  //   model.getCarts()
  //     .then(data => {
  //       res.send(data);
  //     })
  //     .catch(error => {
  //       res.sendStatus(404);
  //     })
  // },
  // saveCart: (req, res) => {
  //   const item = {};
  //   model.saveCart(item)
  //     .then(res => {
  //       res.send(res);
  //     })
  //     .catch(error => {
  //       res.sendStatus(404);
  //     })
  // }
}