import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const settings = JSON.parse(process.env.MYSQL_CREDENTIALS);
const dbName = "drinkshop"
const buildDatabase = dbClosureFunction();
export default buildDatabase;

function dbClosureFunction() {
	function createDatabase() {
		const cloudDb = mysql.createConnection(settings);
		cloudDb.connect(err => {
			cloudDb.query("CREATE DATABASE IF NOT EXISTS test", (err, result) => {
				if (err) throw err;
				console.log("Database - check!");
			});
		});
	}

	function createTables() {
		const cloudDb = mysql.createConnection({multipleStatements: true, database: dbName, ...settings});
		const sql = `
			CREATE TABLE IF NOT EXISTS products (
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
		`;
		cloudDb.connect(err => {
			cloudDb.query(sql, (err, result) => {
				if (err) throw err;
				console.log("Tables schema - check!");
			});
		});
	}

	return {
		createDatabase,
		createTables,
	};
}
