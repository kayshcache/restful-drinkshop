import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const settings = JSON.parse(process.env.MYSQL_CREDENTIALS);
settings.database = 'drinkshop';
const cloudDb = mysql.createConnection(settings);

export const cruds = () => {
	function insertProduct(data, callback) {
		const values = Object.entries(data);
		const sql = `INSERT INTO products (title, price) VALUES ?`;
		cloudDb.connect(err => {
			cloudDb.query(sql, [values], (err, result) => {
				if (err) throw err;
				console.log("Inserted new product(s)");
			});
		});
	}

	function createTables() {
		const sql = `

		`;
		cloudDb.connect(err => {
			cloudDb.query(sql, (err, result) => {
				if (err) throw err;
				console.log("Tables schema - check!");
			});
		});
	}

	return {
		insertProduct,
	};
}

/* Schema Design for reference:
 *TABLE products (
  product_id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(45),
  price DECIMAL(4,2)
);

CREATE TABLE IF NOT EXISTS customers (
  customer_id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  address VARCHAR(255) DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS orders (
  order_id INT AUTO_INCREMENT PRIMARY KEY,
  customer_id INT NOT NULL,
  status VARCHAR(45) NULL DEFAULT 'processing',
  customer_notes VARCHAR(255) NULL
);

CREATE TABLE IF NOT EXISTS orders_products (
  orders_products_id INT PRIMARY KEY AUTO_INCREMENT,
  order_id INT NULL,
  product_id INT NULL,
  quantity INT NULL
);
*/
