import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import mysql from 'mysql2';
import routes from './routes/drinkshopRoutes';
import { closureBuild } from './models/createSchema';

closureBuild.closedFunction();
closureBuild.secondClosure();

dotenv.config();

const app = express();
const PORT = 3000;
const MONGO_CREDENTIALS = process.env.MONGO_CREDENTIALS;
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD;
const MYSQL_CREDENTIALS = JSON.parse(process.env.MYSQL_CREDENTIALS);

// Mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect(`mongodb+srv://${MONGO_CREDENTIALS}@coder-g8zwo.gcp.mongodb.net/restful-drinkshop?retryWrites=true&w=majority`, {
	useUnifiedTopology: true,
	useNewUrlParser: true,
});

/*  MySQL connection
sqlConnection.connect(err => {
	if (err) throw err;
	console.time('mysql');
	console.log('Successfully connected to mysql');
	sqlConnection.query("CREATE DATABASE IF NOT EXISTS drinkshop", (err, result) => {
		if (err) throw err;
		console.log("db created");
	});
});
*/
// Body Parser setup
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// CORS fix for dummy vanilla html/js frontend httpserver to access API endpoints
app.use(cors({origin: 'http://localhost:8080'}));

// Serving static files
app.use(express.static('public'));

routes(app);

app.get('/', (req, res) =>
	res.send(`Node and express server running on port ${PORT} - living in a docker submarine, a docker submarine~`)
);

app.listen(PORT, () =>
	console.log(`The server is running on port ${PORT}`)
);

