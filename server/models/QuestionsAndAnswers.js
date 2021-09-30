const db = require('../../database').questionsAndAnswers;

const formatData = (result) => {
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
  return data;
}

module.exports = {
  get: (product_id, callback) => {
    let queryString =
      `SELECT
        questions.id AS question_id,
        questions.body AS question_body,
        questions.date_written AS question_date,
        questions.asker_name,
        questions.helpful AS question_helpfulness,
        questions.reported,
        answers.id AS answer_id,
        answers.body AS answer_body,
        answers.date_written AS answer_date,
        answers.answerer_name,
        answers.helpful AS answer_helpfulness,
        answers_photos.url
      FROM
        questions
      LEFT JOIN
        answers
      ON
        (questions.id = answers.question_id)
      LEFT JOIN
        answers_photos
      ON
        (answers.id = answers_photos.answer_id)
      WHERE
        questions.product_id = ($1)`;
    db.query(queryString, [product_id], (err, result) => {
      if (err) {
        callback(err);
      } else {
        callback(null, formatData(result));
      }
    })
  }
}