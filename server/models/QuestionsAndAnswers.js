const db = require('../../database').questionsAndAnswers;

module.exports = {
  getQuestions: (product_id) => {
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
        questions.product_id = $1 AND questions.reported = 0
      ORDER BY
        questions.id ASC`;
    return db.query(queryString, [product_id]);
  },

  getAnswers: (question_id, count, page) => {
    let queryString =
      `SELECT
        answers.id AS answer_id,
        answers.body AS answer_body,
        answers.date_written AS answer_date,
        answers.answerer_name,
        answers.helpful AS answer_helpfulness,
        answers_photos.id AS photo_id,
        answers_photos.url
      FROM
        answers
      LEFT JOIN
        answers_photos
      ON
        (answers.id = answers_photos.answer_id)
      WHERE
        answers.question_id = $1 AND answers.reported = 0
      ORDER BY
        answers.id ASC`;
    return db.query(queryString, [question_id]);
  },

  postQuestion: (postInfo) => {
    let queryString =
        `INSERT INTO
          questions(product_id, body, date_written, asker_name, asker_email)
        VALUES
          ($1, $2, $3, $4, $5)
        RETURNING id`;
    return db.query(queryString, postInfo);
  },

  postAnswer: (postInfo) => {
    let queryString =
        `INSERT INTO
          answers(question_id, body, date_written, answerer_name, answerer_email)
        VALUES
          ($1, $2, $3, $4, $5)
        RETURNING id`;
    return db.query(queryString, postInfo);
  },

  postPhotos: (answer_id, photos) => {
    let intoPhotos = [];
    let queryString =
        `INSERT INTO
          answers_photos(answer_id, url)
        VALUES
          ($1, $2)`;
    for (let i = 0; i < photos.length; i++) {
      intoPhotos.push(db.query(queryString, [answer_id, photos[i]]));
    }
    return Promise.all(intoPhotos);
  },

  updateHelpful: (table, id) => {
    let queryString = `UPDATE ${table} SET helpful = helpful + 1 WHERE id = $1`;
    return db.query(queryString, [id]);
  },

  updateReport: (table, id) => {
    let queryString = `UPDATE ${table} SET reported = 1 WHERE id = $1`;
    return db.query(queryString, [id]);
  }
}