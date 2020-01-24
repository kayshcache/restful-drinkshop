CREATE SCHEMA `drinkshop_schema` ;

CREATE TABLE `drinkshop_schema`.`products` (
  `product_id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NULL,
  `price` DECIMAL(4,2) NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `drinkshop_schema`.`customers` (
  `customer_id` VARCHAR(16) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `name` VARCHAR(32) NOT NULL,
  `create_time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `address` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`customer_id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE);

CREATE TABLE `drinkshop_schema`.`orders` (
  `order_id` INT NOT NULL,
  `customer_id` INT NOT NULL,
  `status` VARCHAR(45) NULL DEFAULT 'processing',
  `customer_notes` VARCHAR(255) NULL,
  PRIMARY KEY (`order_id`));

CREATE TABLE `drinkshop_schema`.`orders_products` (
  `orders_products_id` INT NOT NULL AUTO_INCREMENT,
  `order_id` INT NULL,
  `product_id` INT NULL,
  `quantity` INT NULL,
  PRIMARY KEY (`orders_products_id`));

