DROP DATABASE IF EXISTS reviews;
CREATE DATABASE reviews;

-- will enter database in postgreSQL database will lowercase
\c reviews;

CREATE TABLE reviews (
	id serial PRIMARY KEY,
	product_id INTEGER,
	rating INTEGER,
	date BIGINT,
	summary text,
	body text,
	recommend boolean,
	reported boolean,
	reviewer_name VARCHAR(255),
	reviewer_email VARCHAR ( 255 ),
	response text,
	helpfulness INTEGER
);

CREATE TABLE characteristics (
	id serial PRIMARY KEY,
	product_id INTEGER,
	name text
);

CREATE TABLE characteristic_reviews (
	id serial PRIMARY KEY,
	characteristic_id INTEGER,
	review_id INTEGER,
	value INTEGER,
	CONSTRAINT fk_characteristics
		FOREIGN KEY (characteristic_id)
			REFERENCES characteristics(id),
	CONSTRAINT fk_reviews
		FOREIGN KEY (review_id)
			REFERENCES reviews(id)
);

CREATE TABLE photos (
	id serial PRIMARY KEY,
	review_id INTEGER,
	url	text,
	CONSTRAINT fk_reviews
		FOREIGN KEY (review_id)
			REFERENCES reviews(id)
);

-- Copy review CSV
COPY reviews(
	id ,
	product_id,
	rating,
	date,
	summary,
	body,
	recommend,
	reported,
	reviewer_name,
	reviewer_email,
	response,
	helpfulness)
FROM '/home/emm29776/hackreactor/SDC/SDC/database/Reviews/CSV_Files/reviews.csv'
DELIMITER ','
CSV HEADER;

-- Copy characteristics csv
COPY characteristics(id, product_id, name)
FROM '/home/emm29776/hackreactor/SDC/SDC/database/Reviews/CSV_Files/characteristics.csv'
DELIMITER ','
CSV HEADER;

-- Copy from characteristic_reviews
COPY characteristic_reviews(id,characteristic_id,review_id,value)
FROM '/home/emm29776/hackreactor/SDC/SDC/database/Reviews/CSV_Files/characteristic_reviews.csv'
DELIMITER ','
CSV HEADER;

-- Copy from review photos
COPY photos(id,review_id,url)
FROM '/home/emm29776/hackreactor/SDC/SDC/database/Reviews/CSV_Files/reviews_photos.csv'
DELIMITER ','
CSV HEADER;


-- -- Get Max ID from table
-- SELECT MAX(id) FROM reviews;

-- -- Get Next ID from table
-- SELECT nextval('reviews_id_seq');

-- set NextID Value to MAX ID
SELECT setval('reviews_id_seq', (SELECT MAX(id) FROM reviews));

SELECT setval('characteristics_id_seq', (SELECT MAX(id) FROM characteristics));

SELECT setval('characteristic_reviews_id_seq', (SELECT MAX(id) FROM characteristic_reviews));

SELECT setval('photos_id_seq', (SELECT MAX(id) FROM photos));
