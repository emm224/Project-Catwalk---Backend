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

  it('should POST a question to product 44', async () => {
    let product_id = 44;
    let count = 5;
    let page = 1;
    let params = {product_id: product_id, count: count, page: page};
    let body = {
      body: 'This is a test question',
      name: 'Tesing',
      email: '100tests@tests.org',
    }
    await axios.post(`http://127.0.0.1:3000/api/qa/questions/`, body, {params})
      .then(data => {
        expect(data.status).toEqual(201);
      })
      .catch(error => {
        console.log(error);
      })
  });

  it('should POST an answer to question 3518964', async () => {
    let question_id = 3518964;
    let count = 5;
    let page = 1;
    let params = {count: count, page: page};
    let body = {
      body: 'This is a test answers',
      name: 'Tesing',
      email: '100tests@tests.org',
      photos: ['url1.com', 'url2.com', 'url3.com']
    }
    await axios.post(`http://127.0.0.1:3000/api/qa/questions/${question_id}/answers`, body, {params})
      .then(data => {
        expect(data.status).toEqual(201);
      })
      .catch(error => {
        console.log(error);
      })
  });

  // it('should get how many seconds it takes to send 100 get requests', async () => {
  //   let numOfRequests = 100;
  //   let requests = [];
  //   let count = 5;
  //   let page = 1;
  //   for (let i = 0; i < numOfRequests; i++) {
  //     let product_id = i + 1;
  //     let params = {product_id: product_id, count: count, page: page};
  //     requests.push(axios.get(`http://127.0.0.1:3000/api/qa/questions/`, {params}));
  //   }
  //   let start = new Date();
  //   let runtime = await Promise.all(requests)
  //     .then(data => {
  //       let end = new Date();
  //       return end - start;
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     })
  //   console.log('Runtime: ' + runtime + 'ms');
  //   expect(runtime < 500).toEqual(true);
  // });
})