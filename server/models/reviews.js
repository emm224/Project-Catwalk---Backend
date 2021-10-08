const db = require('../../database').reviews;

module.exports = {
  getAll: function (callback) {
    return db.query('SELECT * FROM reviews Limit 25');
  },

  getReview: function (product_id, pageNum, numReviews) {
    let queryString =

      `with product_reviews as

      (
        select *

        from
          reviews

        where product_id = $1
      ),

      photo_summary as
      (
         select photos.review_id
       , json_agg(row_to_json((SELECT t FROM (SELECT photos.id, photos.url) t))) AS photo_info

        from product_reviews

        left join photos

        on photos.review_id = product_reviews.id

        group by photos.review_id
      )

      select
      r.id as review_id
      , r.rating
      , r.summary
      , r.recommend
      , r.response
      , r.body
      , to_timestamp(r.date/1000) as date
      , r.reviewer_name
      , r.helpfulness
      , coalesce(ps.photo_info, '[]') as photos

      from reviews r

      left join photo_summary ps
      on ps.review_id = r.id

      where r.product_id = $1 and r.reported != true


      limit $2 offset (($3 - 1) * $2)
      `
      ;
    return db.query(queryString, [product_id, numReviews || 5, pageNum || 1])
        .then( (result) => {
          var reviews = {
            product: product_id,
            page: pageNum || '1',
            count: numReviews || '5',
            results: result.rows
          }
          return reviews
        })
        .catch(err => {
          return err
        })
      },

  getMetadata: function (product_id) {
    var queryString =
      `with avg_rating as
    (
      select
        c.id,
        c.name,
        c.product_id,
        cr.review_id,
        avg(cr.value) as value

      from
        characteristics c

      full outer join
        characteristic_reviews cr
      on
        c.id = cr.characteristic_id

      where c.product_id = $1

      group by
        c.id, c.name, c.product_id, cr.review_id

      order by cr.review_id, c.id asc

    ),

    characteristic_info as
    (
      select
      product_id
    , json_object_agg(name, row_to_json((SELECT t FROM (SELECT id, value) t))) as characteristics

     from avg_rating

     group by 1
   ),

   ratings_summary as

   (
     select
      product_id,
      rating,
      count(*)

     from
       reviews

     where
      product_id = $1

      group by
        product_id, rating
   ),

   recommend_count as

   (
     select
      product_id,
      recommend,
      count(*)

     from
      reviews

      where
        product_id = $1

        group by
          product_id, recommend
   ),

   ratings_agg as

   (
    select
      product_id,
      json_object_agg(rating, count) as ratings

    from
      ratings_summary

    group by 1

   ),

  recommend_agg as

  (
    select
      product_id,
      json_object_agg(recommend, count) as recommended

    from
      recommend_count

    group by 1

  ),

  join_ratings_recommend as

  (
    select
      rat.product_id,
      rat.ratings,
      rec.recommended

    from
      ratings_agg rat

    join
      recommend_agg rec

    on
      rat.product_id = rec.product_id

  ),

  metadata as

  (
    select
      r.product_id,
      r.ratings,
      r.recommended,
      c.characteristics

    from
      join_ratings_recommend r

    join
      characteristic_info c

    on
      r.product_id = c.product_id
  )


   select
      *
   from
    metadata

    `;

   return db.query(queryString, [product_id])
    .then(result => {
      return result.rows[0]
    })
    .catch(err => {
      return err
    })
  },

  postAReview: function (params) {

    var fields = [params.product_id, params.rating, params.summary, params.body, params.recommend, params.name, params.email];
    var photos = params.photos
    var charList = params.characteristics

    var addReviewInfo = `
    insert into
      reviews (product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness)

    values
      ($1, $2, ${Date.now()}, $3, $4, $5, false, $6, $7, 'null', 0)

    returning
      id
    `

    return db.query(addReviewInfo, fields)
      .then(
        id => {
          var id = id.rows[0].id
          console.log('this is id', id)
          let queryArray = [];

          if (photos.length > 0) {
            for (var i = 0; i < photos.length; i++) {
              var addPhotos = `
                insert into
                  photos(review_id, url)
                values
                  ($1, $2)

                `

              queryArray.push(db.query(addPhotos, [id, photos[i]]))
            }
          }

          var addCharacteristicReviews = `
                  INSERT INTO
                    characteristic_reviews(characteristic_id, review_id, value)
                  VALUES
                    ($1, $2, $3)`
          for (let characteristic in charList) {
            console.log('this is charlist obj', [characteristic, id, charList[characteristic]])
            queryArray.push(db.query(addCharacteristicReviews, [characteristic, id, charList[characteristic]]));
          }

        return Promise.all(queryArray)
        }
      );
  },

  updateHelpful: function(review_id) {
    var queryString = 'update reviews set helpfulness = helpfulness+1 where id = $1'
    console.log('this is review id', review_id)
    return db.query(queryString, [review_id])
  },

  reported: function(review_id) {
    var queryString = 'update reviews set reported = true where id = $1'
    return db.query(queryString, [review_id])
  }

}