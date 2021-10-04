const db = require('./../../database').Products;

module.exports = {
  getProducts: (count, page) => {
    const query = `SELECT * FROM products
    LIMIT ($1) OFFSET (($2 - 1) * $1)`;
    const args = [count, page];
    return new Promise((resolve, reject) => {
      db.query(query, args, (error, data) => {
        if (error) reject(error);
        const queryData = [];
        for (let i = 0; i < data.rows.length; i++) {
          const currentData = {
            id: data.rows[i].id,
            name: data.rows[i].name,
            slogan: data.rows[i].slogan,
            description: data.rows[i].description,
            category: data.rows[i].category,
            default_price: String(`${data.rows[i].default_price}.00`)
          }
          queryData.push(currentData);
        }
        resolve(queryData);
      })
    })
  },
  getProductData: (id) => {
    const args = [id];
    const productQuery = 'SELECT * FROM products WHERE id=($1)';
    const featuresQuery = `SELECT * FROM features WHERE product_id=($1)`;
    return Promise.all([db.query(productQuery, args), db.query(featuresQuery, args)])
      .then(data => {
        let [productData, productFeature] = data;
        productData = productData.rows;
        productFeature = productFeature.rows;

        const features = [];
        for (let i = 0; i < productFeature.length; i++) {
          features.push({ feature: productFeature[i].feature, value: productFeature[i].value })
        }

        // Formatting the data
        const queryData = {
          id: productData[0].id,
          name: productData[0].name,
          slogan: productData[0].slogan,
          description: productData[0].description,
          category: productData[0].category,
          default_price: String(`${productData[0].default_price}.00`),
          features: features
        };
        return queryData;
      })
      .catch(error => {
        console.error(error);
      })
  },
  getProductStyle: (id) => {
    const args = [id];
    const stylesQuery = 'SELECT * FROM styles WHERE productId=($1)';
    const photosQuery = `SELECT * FROM photos WHERE styleId in
    (SELECT id FROM styles WHERE productId=($1))`;
    const skusQuery = `SELECT * FROM skus WHERE styleId in
    (SELECT id FROM styles WHERE productId=($1))`;

    return Promise.all([db.query(stylesQuery, args), db.query(photosQuery, args), db.query(skusQuery, args)])
      .then(data => {
        let [styles, photos, skus] = data;
        styles = styles.rows;
        photos = photos.rows;
        skus = skus.rows;

        const results = [];
        for (let i = 0; i < styles.length; i++) {
          const currStyleId = styles[i].id;
          const currStylePhotos = [];
          const currStyleSkus = {};

          // Adding photos and skus for each style
          for (let j = 0; j < photos.length; j++) {
            photos[j].styleid === currStyleId ? currStylePhotos.push({ thumbnail_url: photos[j].thumbnail_url, url: photos[j].url }) : null
          }
          for (let n = 0; n < skus.length; n++) {
            const skuId = skus[n].id;
            skus[n].styleid === currStyleId ? currStyleSkus[skuId] = { quantity: skus[n].quantity, size: skus[n].size } : null
          }

          const sale = styles[i].sale_price === 'null' ? null : String(`${styles[i].sale_price}.00`);
          const dft_style = styles[i].default_style === 1 ? true : false;

          // Formatting the data
          let style = {
            style_id: currStyleId,
            name: styles[i].name,
            original_price: String(`${styles[i].original_price}.00`),
            sale_price: sale,
            'default?': dft_style,
            photos: currStylePhotos,
            skus: currStyleSkus
          }
          results.push(style)
        }
        const queryData = {
          product_id: id,
          results
        }
        return queryData;
      })
      .catch(error => {
        console.error(error)
      })
  },
  getRelated: (id) => {
    const query = 'SELECT * FROM related WHERE current_product_id=($1)';
    const args = [id];
    return new Promise((resolve, reject) => {
      db.query(query, args, (error, data) => {
        if (error) reject(error);
        let relatedItems = [];
        for (let i = 0; i < data.rows.length; i++) {
          relatedItems.push(data.rows[i].related_product_id)
        }
        resolve(relatedItems);
      })
    })
  },
  // TODO
  // getCarts: () => {
  //   const query = 'SELECT * FROM cart LIMIT 25';
  //   return new Promise((resolve, reject) => {
  //     db.query(query, (error, data) => {
  //       if (error) reject(error);
  //       resolve(data.rows)
  //     })
  //   })
  // },
  // TODO
  // saveCart: (item) => {
  //   const query = '';
  //   const args = [];
  //   return new Promise((resolve, reject) => {
  //     db.query(query, args, (error, data) => {
  //       if (error) reject(error);
  //       resolve(data.rows);
  //     })
  //   })
  // }
}