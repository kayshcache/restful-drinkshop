import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import mysql from 'mysql2';
import routes from './routes/drinkshopRoutes';

dotenv.config();

const app = express();
const PORT = 3000;
const DB_CREDENTIALS = process.env.DB_CREDENTIALS;

// Mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect(`mongodb+srv://${DB_CREDENTIALS}@coder-g8zwo.gcp.mongodb.net/restful-drinkshop?retryWrites=true&w=majority`, {
	useUnifiedTopology: true,
	useNewUrlParser: true,
});

// MySQL connection
const sqlConnection = mysql.createConnection({
	host: 'localhost',
	port: '3406',
	user: 'root',
	password: 'thepassword',
	database: 'drinkshop_schema',
});

sqlConnection.connect(err => {
	if (err) throw err;
	console.time('mysql');
	console.log('Successfully connected to mysql');
	sqlConnection.end();
});

// Body Parser setup
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// CORS fix for dummy vanilla js frontend to access API
app.use(cors({origin: 'http://localhost:8080'}));

// Serving static files
// app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(express.static('public'));

routes(app);

app.get('/', (req, res) =>
	res.send(`Node and express server running on port ${PORT} - living in a docker submarine, a docker submarine~`)
);

app.listen(PORT, () =>
	console.log(`Your server is running on port ${PORT}`)
);

