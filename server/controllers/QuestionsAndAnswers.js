const models = require('../models').questionsAndAnswers;

const formatQuestionsData = (product_id, count = 5, page = 1, result) => {
  let dataObj = {};
  for (let i = 0; i < result.rows.length; i++) {
    let currentRow = result.rows[i];
    if (dataObj[currentRow.question_id] === undefined) {
      dataObj[currentRow.question_id] = {
        question_id: currentRow.question_id,
        question_body: currentRow.question_body,
        question_date: new Date(Number(currentRow.question_date)),
        asker_name: currentRow.asker_name,
        question_helpfulness: currentRow.question_helpfulness,
        reported: currentRow.reported === 0 ? false : true,
        answers: {}
      }
    }
    if (currentRow.answer_id !== null) {
      dataObj[currentRow.question_id].answers[currentRow.answer_id] = {
        id: currentRow.answer_id,
        body: currentRow.answer_body,
        date: new Date(Number(currentRow.answer_date)),
        answerer_name: currentRow.answerer_name,
        helpfulness: currentRow.answer_helpfulness,
        photos: []
      }
    }
    if (currentRow.url !== null) {
      dataObj[currentRow.question_id].answers[currentRow.answer_id].photos.push(currentRow.url);
    }
  };
  let data = [];
  for (let key in dataObj) {
    data.push(dataObj[key]);
  }
  return {product_id: product_id, results: data.splice(((page - 1) * count), count)};
};

const formatAnswersData = (question_id, count = 5, page = 1, result) => {
  let dataObj = {};
  for (let i = 0; i < result.rows.length; i++) {
    let currentRow = result.rows[i];
    if (dataObj[currentRow.answer_id] === undefined) {
      dataObj[currentRow.answer_id] = {
        answer_id: currentRow.answer_id,
        body: currentRow.answer_body,
        date: new Date(Number(currentRow.answer_date)),
        answerer_name: currentRow.answerer_name,
        helpfulness: currentRow.answer_helpfulness,
        photos: []
      }
    }
    if (currentRow.url !== null) {
      dataObj[currentRow.answer_id].photos.push({id: currentRow.photo_id, url: currentRow.url});
    }
  }
  let data = [];
  for (let key in dataObj) {
    data.push(dataObj[key]);
  }
  return {question: question_id, page: page, count: count, results: data.splice(((page - 1) * count), count)};
};

module.exports = {
  getQuestions: (req, res) => {
    models.getQuestions(req.query.product_id)
      .then(data => {
        res.send(formatQuestionsData(req.query.product_id, req.query.count, req.query.page, data));
      })
      .catch(error => {
        res.status(404).end();
      })
  },

  getAnswers: (req, res) => {
    models.getAnswers(req.params.question_id)
      .then(data => {
        res.send(formatAnswersData(req.params.question_id, req.query.count, req.query.page, data));
      })
      .catch(error => {
        res.status(404).end();
      })
  },

  postQuestion: (req, res) => {
    let postInfo = [req.query.product_id, req.body.body, new Date().getTime(), req.body.name, req.body.email];
    models.postQuestion(postInfo)
      .then(data => {
        res.status(201).end();
      })
      .catch(error => {
        console.log(error);
        res.status(404).end();
      })
  },

  postAnswer: (req, res) => {
    let postInfo = [req.params.question_id, req.body.body, new Date().getTime(), req.body.name, req.body.email];
    let photos = req.body.photos;
    models.postAnswer(postInfo)
      .then(data => {
        if (photos.length > 0) {
          models.postPhotos(data.rows[0].id, photos)
            .then(() => {
              res.status(201).end();
            })
        }
      })
      .catch(error => {
        console.log(error);
        res.status(404).end();
      })
  },

  updateQuestionHelpful: (req, res) => {
    models.updateHelpful('questions', req.params.question_id)
      .then(data => {
        res.status(204).end();
      })
      .catch(error => {
        res.status(404).end();
      })
  },

  updateQuestionReport: (req, res) => {
    models.updateReport('questions', req.params.question_id)
      .then(data => {
        res.status(204).end();
      })
      .catch(error => {
        res.status(404).end();
      })
  },

  updateAnswerHelpful: (req, res) => {
    models.updateHelpful('answers', req.params.answer_id)
      .then(data => {
        res.status(204).end();
      })
      .catch(error => {
        res.status(404).end();
      })
  },

  updateAnswerReport: (req, res) => {
    models.updateReport('answers', req.params.answer_id)
      .then(data => {
        res.status(204).end();
      })
      .catch(error => {
        res.status(404).end();
      })
  }
}
