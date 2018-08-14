DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
	item_id INT AUTO_INCREMENT NOT NULL,
	product_name VARCHAR(255) NOT NULL,
    department_name VARCHAR(255) NOT NULL,
    price INT NOT NULL,
    stock_quantity INT NULL,
	PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES 
('Jane Eyre', 'Books', 10, 10), 
('Harry Potter Series', 'Books', 50, 10), 
('Bose Headphones', 'Electronics', 200, 10), 
('Macbook Pro', 'Electronics', 900, 10), 
('Polaroid Camera', 'Lifestyle', 100, 10), 
('Converse', 'Shoes', 40, 10), 
('Hanes Leggings', 'Apparel', 30, 10), 
('True Religion Basic Tee', 'Apparel', 20, 10), 
('Stirling Silver Heart Necklace', 'Jewelery', 25, 10), 
('Teardrop Opal Earrings', 'Jewelry', 15, 10);
