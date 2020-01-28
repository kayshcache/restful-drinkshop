import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const sqlConnection = mysql.createConnection(JSON.parse(process.env.MYSQL_CREDENTIALS));
export const closureBuild = dbFunction();

function dbFunction() {
	function closedFunction() {
		sqlConnection.connect(err => {
			sqlConnection.query("CREATE DATABASE IF NOT EXISTS test", (err, result) => {
				if (err) throw err;
				console.log("db created with a closure");
			});
		});
	}
	function secondClosure() {
		sqlConnection.connect(err => {
			sqlConnection.query("CREATE DATABASE IF NOT EXISTS test2", (err, result) => {
				if (err) throw err;
				console.log("second db created with a closure");
			});
		});
	}

	return {
		closedFunction,
		secondClosure,
	};
}

function createDatabase(err) {
	if (err) throw err;
	console.log("connected!");
	sqlConnection.query("CREATE DATABASE IF NOT EXISTS drinkshop", (err, result) => {
		if (err) throw err;
		console.log("Database created");
	});
	sqlConnection.end();
}

function createTables(err) {
	if (err) throw err;
	sqlConnection.query(`
		
	`, (err, result) => {
	});
	sqlConnection.end();
}
