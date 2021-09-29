DROP DATABASE IF EXISTS questionsandanswers;
CREATE DATABASE questionsandanswers;

\c questionsandanswers;

-- DROP TABLE IF EXISTS questions;
CREATE TABLE questions (
  id SERIAL PRIMARY KEY,
  product_id INTEGER,
  body VARCHAR(255),
  date_written BIGINT,
  asker_name VARCHAR(255),
  asker_email VARCHAR(255),
  reported INTEGER,
  helpful INTEGER
);

-- DROP TABLE IF EXISTS answers;
CREATE TABLE answers (
  id SERIAL PRIMARY KEY,
  question_id INTEGER,
  body VARCHAR(255),
  date_written BIGINT,
  answerer_name VARCHAR(255),
  answerer_email VARCHAR(255),
  reported INTEGER,
  helpful INTEGER,
  CONSTRAINT fk_question
    FOREIGN KEY(question_id)
      REFERENCES questions(id)
);

-- DROP TABLE IF EXISTS answers_photos;
CREATE TABLE answers_photos (
  id SERIAL PRIMARY KEY,
  answer_id INTEGER,
  "url" TEXT,
  CONSTRAINT fk_answer
    FOREIGN KEY(answer_id)
      REFERENCES answers(id)
);


COPY questions(id,product_id,body,date_written,asker_name,asker_email,reported,helpful)
FROM '/Users/yespacefeng/Desktop/HackReactor/SDC/CSV_files/questions.csv'
DELIMITER ','
CSV HEADER;

COPY answers(id,question_id,body,date_written,answerer_name,answerer_email,reported,helpful)
FROM '/Users/yespacefeng/Desktop/HackReactor/SDC/CSV_files/answers.csv'
DELIMITER ','
CSV HEADER;

COPY answers_photos(id,answer_id,url)
FROM '/Users/yespacefeng/Desktop/HackReactor/SDC/CSV_files/answers_photos.csv'
DELIMITER ','
CSV HEADER;
