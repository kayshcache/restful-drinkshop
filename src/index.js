import express from 'express';
import cors from 'cors';
import routes from './routes/drinkshopRoutes';
import buildDatabase from './models/createSchema';

const app = express();
const dbName = 'drinkshop';
const db = buildDatabase(dbName);
const PORT = 3000;

// MySQLL create database and fill with tables
db.createDatabase();
db.createTables();

// Body Parser setup
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// CORS fix for dummy vanilla html/js frontend httpserver to access API endpoints
app.use(cors({origin: 'http://localhost:8080'}));

// Serving static files if needed
app.use(express.static('public'));

routes(app);

app.get('/', (req, res) =>
	res.send(`To access client go to http://localhost:8080`)
);

app.listen(PORT, () =>
	console.log(`API server is running on port ${PORT}`)
);

