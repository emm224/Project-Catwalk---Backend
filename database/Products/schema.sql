DROP DATABASE IF EXISTS productsapi;
CREATE DATABASE productsapi;

-- Connecting PostgreSQL to database. (use <database>) from SQL
\c productsapi;

CREATE TABLE products (
  id serial PRIMARY KEY,
  name VARCHAR(255),
  slogan TEXT,
  description TEXT,
  category VARCHAR (255),
  default_price int
);

CREATE TABLE features (
  id serial PRIMARY KEY,
  product_id int,
  CONSTRAINT ft_productId
    FOREIGN KEY (product_id)
      REFERENCES products(id),
  feature VARCHAR(255),
  value VARCHAR(255)
);

CREATE TABLE styles (
  id serial PRIMARY KEY,
  productId int,
  CONSTRAINT st_productId
    FOREIGN KEY (productId)
      REFERENCES products(id),
  name VARCHAR(255),
  sale_price text,
  original_price int,
  default_style int
);

CREATE TABLE skus (
  id serial PRIMARY KEY,
  styleId int,
  CONSTRAINT sk_styleId
    FOREIGN KEY (styleId)
      REFERENCES styles(id),
  size VARCHAR(255),
  quantity int
);

CREATE TABLE photos (
  id serial PRIMARY KEY,
  styleId int,
  CONSTRAINT st_styleId
    FOREIGN KEY (styleId)
      REFERENCES styles(id),
  url TEXT,
  thumbnail_url TEXT
);

CREATE TABLE related (
  id serial PRIMARY KEY,
  current_product_id int,
  related_product_id int
);

CREATE Table cart (
  id serial PRIMARY KEY,
  user_session int,
  product_id int,
  CONSTRAINT ct_productId
    FOREIGN KEY (product_id)
      REFERENCES products(id),
  active int
);


-- Copy products csv data
COPY products(id,name,slogan,description,category,default_price)
FROM '/Users/sebastian/Desktop/System Design Capstone/SDC/database/Products/csv/product.csv'
DELIMITER ','
CSV HEADER;

-- Copy features csv data
COPY features(id,product_id,feature,value)
FROM '/Users/sebastian/Desktop/System Design Capstone/SDC/database/Products/csv/features.csv'
DELIMITER ','
CSV HEADER;

-- Copy styles csv data
COPY styles(id,productId,name,sale_price,original_price,default_style)
FROM '/Users/sebastian/Desktop/System Design Capstone/SDC/database/Products/csv/styles.csv'
DELIMITER ','
CSV HEADER;

-- Copy skus csv data
COPY skus(id,styleId,size,quantity)
FROM '/Users/sebastian/Desktop/System Design Capstone/SDC/database/Products/csv/skus.csv'
DELIMITER ','
CSV HEADER;

-- Copy photos csv data
COPY photos(id,styleId,url,thumbnail_url)
FROM '/Users/sebastian/Desktop/System Design Capstone/SDC/database/Products/csv/photos.csv'
DELIMITER ','
CSV HEADER;

-- Copy related csv data
COPY related(id,current_product_id,related_product_id)
FROM '/Users/sebastian/Desktop/System Design Capstone/SDC/database/Products/csv/related.csv'
DELIMITER ','
CSV HEADER;

-- Copy cart csv data
COPY cart(id,user_session,product_id,active)
FROM '/Users/sebastian/Desktop/System Design Capstone/SDC/database/Products/csv/cart.csv'
DELIMITER ','
CSV HEADER;