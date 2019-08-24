DROP DATABASE IF EXISTS bamazonDB;
CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE `products`(
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `product_name`  VARCHAR(30) NOT NULL,
  `department_id` VARCHAR(11) NOT NULL,
  `price` DECIMAL(10,2) NOT NULL,
  `stock_quantity` INT(11) NOT NULL,
  PRIMARY KEY (`id`)
  KEY `department_id`(`department_id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;



use bamazonDB
   
  INSERT INTO `products` VALUES
  (1, 'Apple', 1, 2.00, 100),
  (2, 'Orange', 1, 1.00, 90),
  (3, 'Bananas', 1, 1.50, 80),
  
  (4, '4-K Samsung TV', 2, 499.99, 25),
  (5,'Play-Station 4', 2, 299.99, 10),
  (6,'Nintendo Switch', 2, 199.99, 5),
  
  (7, 'Soap', 3, 6.00, 75),
  (8, 'ToothPaste', 3, 4.25, 45),
  (9, 'Toilet-Paper', 3, 15.50, 45);




   