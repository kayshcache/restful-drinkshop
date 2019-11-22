import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import favicon from 'express-favicon';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
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

// Body Parser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// CORS for frontend to access API
app.use(cors({origin: 'http://localhost:8081'}));

// Serving static files
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(express.static('public'));

routes(app);

app.get('/', (req, res) =>
	res.send(`Node and express server running on port ${PORT} - living in a docker submarine, a docker submarine~`)
);

app.listen(PORT, () =>
	console.log(`Your server is running on port ${PORT}`)
);

