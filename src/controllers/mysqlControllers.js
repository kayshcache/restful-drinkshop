import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const settings = JSON.parse(process.env.MYSQL_CREDENTIALS);
settings.database = 'drinkshop';
export default cruds;

function cruds() {
	// INSERT INTO *
	function insertProduct(req, res) {
		const cloudDb = mysql.createConnection(settings);
		const value = [Object.values(req.body)];
		cloudDb.connect(err => {
			if (err) res.send(err);
			const sql = 'INSERT INTO products (title, price) VALUES ?';
			cloudDb.query(sql, [value], (err, result) => {
				if (err) res.send(err);
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
			if (err) res.send(err);
			const sql = 'INSERT INTO customers (name, email, address) VALUES ?';
			cloudDb.query(sql, [[values]], (err, result) => {
				if (err) res.send(err);
				console.log(`Customer inserted "${name}" with customer_id: ` + result.insertId);
				res.json(result);
			});
			cloudDb.end();
		});
	}

	function insertOrder(req, res) {
		const cloudDb = mysql.createConnection(settings);
		const {customer_id, order_status, customer_notes} = req.body;
		const values = [customer_id, order_status, customer_notes];
		cloudDb.connect(err => {
			if (err) res.send(err);
			const sql = 'INSERT INTO orders (customer_id, order_status, customer_notes) VALUES ?';
			cloudDb.query(sql, [[values]], (err, result) => {
				if (err) res.send(err);
				console.log(`Order inserted with status "${order_status}" with order_id: ` + result.insertId);
				res.json(result);
			});
			cloudDb.end();
		});
	}
	
	function insertOrderProducts(req, res) {
		const cloudDb = mysql.createConnection(settings);
		const {order_id, product_id, quantity} = req.body;
		const values = [order_id, product_id, quantity];
		cloudDb.connect(err => {
			if (err) res.send(err);
			const sql = 'INSERT INTO orders (order_id, product_id, quantity) VALUES ?';
			cloudDb.query(sql, [[values]], (err, result) => {
				if (err) res.send(err);
				console.log(`Order products inserted with id: ` + result.insertId);
				res.json(result);
			});
			cloudDb.end();
		});
	}

	// SELECT *
	function selectAll(req, res) {
		const cloudDb = mysql.createConnection(settings);
		cloudDb.connect(err => {
			if (err) res.send(err);
			// Fetching the table name from the request object makes this function reusable!
			// Unfortunately ugly though because must go into the callback.
			cloudDb.query(`SELECT * FROM ${req.originalUrl.slice(1, req.originalUrl.length-1)}`, (err, result, fields) => {
				if (err) res.send(err);
				const preparedResult = result.map(record => {
					if (record.price) {
						record.price = `$${record.price}`
					}
					return record;
				});
				res.json(preparedResult);
			});
			cloudDb.end();
		});
	}

	function getAveragePrice(req, res) {
		const cloudDb = mysql.createConnection(settings);
		cloudDb.connect(err => {
			if (err) res.send(err);
			cloudDb.query(`SELECT AVG(price) AS price FROM products`, (err, result, fields) => {
				if (err) res.send(err);
				result[0].price = `$${Number(result[0].price).toFixed(2)}`;
				res.json(result);
			});
			cloudDb.end();
		});
	}

	function selectOrders(req, res) {
		const cloudDb = mysql.createConnection(settings);
		cloudDb.connect(err => {
			if (err) res.send(err);
			cloudDb.query(`
			SELECT order_id AS orderNumber, name AS customer, GROUP_CONCAT(productName) AS products, SUM(totalPrice) AS totalPrice FROM (SELECT o.order_id, c.name, p.title AS productName, p.price, op.quantity, (p.price * op.quantity) AS totalPrice
			FROM orders o 
			    JOIN customers c ON o.customer_id = c.customer_id
			    JOIN orders_products op ON o.order_id = op.order_id
			    JOIN products p ON op.product_id = p.product_id) AS all_orders
			GROUP BY order_id`, (err, result, fields) => {
				if (err) res.send(err);
				res.json(result.map(record => {
					record.totalPrice = `$${record.totalPrice}`
					return record;
				}));
			});
			cloudDb.end();
		});
	}
	
	function selectOrderById(req, res) {
		const cloudDb = mysql.createConnection(settings);
		cloudDb.connect(err => {
			if (err) res.send(err);
			// Request params must go into the callback.
			cloudDb.query(`
			SELECT p.title AS Product, op.quantity AS QTY, (p.price * op.quantity) AS subtotal
			FROM orders o
			    JOIN orders_products op ON o.order_id = op.order_id
			    JOIN products p ON op.product_id = p.product_id
			WHERE o.order_id = '${req.params.order_id}'
			ORDER BY subtotal DESC`, (err, result, fields) => {
				if (err) res.send(err);
				res.status(200).json(result);
			});
			cloudDb.end();
		});
	}

	// DELETE FROM
	// Have access this req.params.productId
	function deleteRecord(req, res) {
		const cloudDb = mysql.createConnection(settings);
		cloudDb.connect(err => {
			if (err) res.send(err);
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

	// UPDATE *
	function updatePrice(req, res) {
		const cloudDb = mysql.createConnection(settings);
		cloudDb.connect(err => {
			if (err) res.send(err);
			cloudDb.query(`UPDATE products SET price = '1.05' WHERE product_id = '${req.params.product_id}'`, (err, result) => {
				if (err) res.send(err);
				res.json(result);
			});
			cloudDb.end();
		});
	}

	function exportAll(req, res) {
		const cloudDb = mysql.createConnection(settings);
		cloudDb.connect(err => {
			if (err) res.send(err);
			// Fetching the table name from the request object makes this function reusable!
			// Unfortunately ugly though because must go into the callback.
			cloudDb.query(`
			SELECT * FROM customers, orders, orders_products, products
			INTO OUTFILE '/tmp/sql_dump.csv'
			FIELDS TERMINATED BY ','
			ENCLOSED BY '"'
			LINES TERMINATED BY '\n'`, (err, result) => {
				if (err) res.send(err);
				res.json(result);
			});
			cloudDb.end();
		});
	}

	return {
		insertProduct,
		insertCustomer,
		insertOrder,
		selectAll,
		selectOrders,
		selectOrderById,
		getAveragePrice,
		deleteRecord,
		updatePrice,
		exportAll,
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
  order_status VARCHAR(45) NULL DEFAULT 'processing',
  customer_notes VARCHAR(255) NULL
);

CREATE TABLE IF NOT EXISTS orders_products (
  order_id INT NULL,
  product_id INT NULL,
  quantity INT NULL
);
*/
