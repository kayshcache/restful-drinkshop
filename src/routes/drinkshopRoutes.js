import { addNewProduct, getProducts, getProductWithId, updateProduct, deleteProduct} from '../controllers/drinkshopController';

const routes = (app) => {
	/* Drinkshop Home Route
	 * 
	 * Here is the GET/POST/PUT/DELETE first Endpoints for the "drinkshop"
	 * More routes can be copied from this or redesigned.
	 *
	 * mongoDB collection
	 * 
	 * */
	app.route('/')
	.get((req, res, next) => {
		// Middleware
		console.log(`Request from: ${req.originalUrl}`)
		console.log(`Request type: ${req.method}`)
		next();
	}, getProducts)

	// Products - POST endpoint
	.post(addNewProduct);

	app.route('/:productId')

	// Products ID - GET specific contact by id
	.get(getProductWithId)

	// Product ID - PUT request
	.put(updateProduct)

	// Product id - DELETE request
	.delete(deleteProduct)
}

export default routes;
