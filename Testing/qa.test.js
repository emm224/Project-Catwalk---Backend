const axios = require('axios');

describe('Questions and Answers', () => {
  it('should get questions for a product from database', async () => {
    let product_id = 1;
    let count = 5;
    let page = 1;
    let params = {product_id: product_id, count: count, page: page};
    let result = await axios.get(`http://127.0.0.1:3000/api/qa/questions/`, {params});
    expect(result.data.results[0].question_body).toEqual('What fabric is the top made of?');
  });

  it('should get the answers to question id 44 from the database.', async () => {
    let question_id = 44;
    let count = 2;
    let page = 1;
    let params = {count: count, page: page};
    let result = await axios.get(`http://127.0.0.1:3000/api/qa/questions/${question_id}/answers`, {params});
    expect(result.data.results[0].answer_id).toEqual(50);
  });


})