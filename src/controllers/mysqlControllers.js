import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const settings = JSON.parse(process.env.MYSQL_CREDENTIALS);
settings.database = 'drinkshop';
export default cruds;

function cruds() {
	function insertProduct(req, res) {
		const cloudDb = mysql.createConnection(settings);
		const value = [Object.values(req.body)];
		cloudDb.connect(err => {
			if (err) throw err;
			const sql = 'INSERT INTO products (title, price) VALUES ?';
			cloudDb.query(sql, [value], (err, result) => {
				if (err) throw err;
				console.log(`Product inserted "${title}" with product_id: ` + result.insertId);
				res.json(result);
			});
			cloudDb.end();
		});
	}

	function insertCustomer(req, res) {
		const cloudDb = mysql.createConnection(settings);
		const {name, email, address} = req.body;
		const values = [name, email, address];
		cloudDb.connect(err => {
			if (err) throw err;
			const sql = 'INSERT INTO customers (name, email, address) VALUES ?';
			cloudDb.query(sql, [[values]], (err, result) => {
				if (err) throw err;
				console.log(`Customer inserted "${name}" with customer_id: ` + result.insertId);
				res.json(result);
			});
			cloudDb.end();
		});
	}


	function selectAll(req, res) {
		const cloudDb = mysql.createConnection(settings);
		cloudDb.connect(err => {
			if (err) throw err;
			// Fetching the table name from the request object makes this function reusable!
			// Unfortunately ugly though because must go into the callback.
			cloudDb.query(`SELECT * FROM ${req.originalUrl.slice(1, req.originalUrl.length-1)}`, (err, result, fields) => {
				if (err) res.send(err);
				res.json(result);
			});
			cloudDb.end();
		});
	}

	// Have access this req.params.productId
	function deleteRecord(req, res) {
		const cloudDb = mysql.createConnection(settings);
		cloudDb.connect(err => {
			if (err) throw err;
			// Request params must go into the callback.
			cloudDb.query(`
				DELETE FROM products
				WHERE product_id = '${req.params.product_id}'`, (err, result, fields) => {
				if (err) res.send(err);
				res.json(result.affectedRows && 'Record deleted' || 'No record by that ID');
			});
			cloudDb.end();
		});
	}

	function updatePrice(req, res) {
		const cloudDb = mysql.createConnection(settings);
		cloudDb.connect(err => {
			if (err) throw err;
			cloudDb.query(`UPDATE products SET price = '1.05' WHERE product_id = '${req.params.product_id}'`, (err, result) => {
				if (err) res.send(err);
				res.json(result);
			});
			cloudDb.end();
		});
	}

	function getAveragePrice(req, res) {
		const cloudDb = mysql.createConnection(settings);
		cloudDb.connect(err => {
			if (err) throw err;
			cloudDb.query(`SELECT AVG(price) FROM products`, (err, result, fields) => {
				if (err) res.send(err);
				res.json(result);
			});
			cloudDb.end();
		});
	}

	return {
		insertProduct,
		insertCustomer,
		selectAll,
		getAveragePrice,
		deleteRecord,
		updatePrice,
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
