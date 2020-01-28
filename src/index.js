import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import mysql from 'mysql2';
import routes from './routes/drinkshopRoutes';
import buildDatabase from './models/createSchema';

dotenv.config();

const app = express();
const PORT = 3000;
const MONGO_CREDENTIALS = process.env.MONGO_CREDENTIALS;

// Mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect(`mongodb+srv://${MONGO_CREDENTIALS}@coder-g8zwo.gcp.mongodb.net/restful-drinkshop?retryWrites=true&w=majority`, {
	useUnifiedTopology: true,
	useNewUrlParser: true,
});

//  MySQL connection
buildDatabase.createDatabase();
buildDatabase.createTables();

// Body Parser setup
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// CORS fix for dummy vanilla html/js frontend httpserver to access API endpoints
app.use(cors({origin: 'http://localhost'}));

// Serving static files
app.use(express.static('public'));

routes(app);

app.get('/', (req, res) =>
	res.send(`Node and express server running on port ${PORT} - living in a docker submarine, a docker submarine~`)
);

app.listen(PORT, () =>
	console.log(`The server is running on port ${PORT}`)
);

