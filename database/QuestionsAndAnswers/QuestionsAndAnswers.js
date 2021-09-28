/*
Questions and Answers MongoDB schema
{
  product_id: {type: Number, index: {unique: true}},
  results: [
    {
      question_id: Number,
      question_body: String,
      question_date: Date,
      asker_name: String,
      question_helpfulness: Number,
      reported: Boolean,
      answers: {
        answer_id: {
          id: Number,
          body: String,
          date: Date,
          answerer_name: String,
          helpfulness: Number,
          photos: [
            String
          ]
        }
      }
    }
  ]
}
*/