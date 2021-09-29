DROP DATABASE IF EXISTS productsapi;
CREATE DATABASE productsapi;

-- Connecting PostgreSQL to database. (use <database>) from SQL
\c productsapi;

CREATE TABLE products (
  id serial PRIMARY KEY,
  product_id int NOT NULL unique,
  name VARCHAR(255) NOT NULL unique,
  slogan TEXT NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR (255),
  default_price int NOT NULL
);

CREATE TABLE features (
  feature_id serial PRIMARY KEY,
  product_id int,
  CONSTRAINT ft_productId
    FOREIGN KEY (product_id)
      REFERENCES products(product_id),
  feature VARCHAR(255) NOT NULL,
  value VARCHAR(255) NOT NULL
);

CREATE TABLE styles (
  style_id serial PRIMARY KEY,
  product_id int,
  CONSTRAINT st_productId
    FOREIGN KEY (product_id)
      REFERENCES products(product_id),
  name VARCHAR(255) NOT NULL unique,
  sale_price int,
  original_price int NOT NULL,
  default_style int NOT NULL
);

CREATE TABLE photos (
  id serial PRIMARY KEY,
  style_id int unique,
  CONSTRAINT st_styleId
    FOREIGN KEY (style_id)
      REFERENCES styles(style_id),
  url TEXT NOT NULL,
  thumbnail_url TEXT NOT NULL
);

CREATE TABLE related (
  id serial PRIMARY KEY,
  current_product_id int NOT NULL,
  related_product_id int NOT NULL
);

CREATE Table cart (
  id serial PRIMARY KEY,
  product_id int,
  CONSTRAINT ct_productId
    FOREIGN KEY (product_id)
      REFERENCES products(product_id),
  user_session int NOT NULL,
  active int NOT NULL
);

