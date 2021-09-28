Reviews API MongoDB schema

reviews = {
  product: { type: Number, index: { unique: true } },
  page: Number,
  count: Number
  results: [
    {
      review_id: Number,
      rating: Number,
      summary: String,
      recommend: Boolean,
      response: String,
      body: String,
      date: Date,
      reviewer_name: String,
      email: String,
      helpfulness: Number,
      Photos: [
        String
      ]
    }]
}

Characteristics = {
  product_id: Number,
  characteristic_id: Number,
  characteristic_name: String
}
