import { addNewProduct, getProducts, getProductWithId, updateProduct, deleteProduct } from '../controllers/drinkshopController';
import { getCustomers, getCustomerByEmail } from '../controllers/drinkshopController';
import { cruds } from '../controllers/mysqlControllers';

const routes = (app) => {
	/* Drinkshop Home Route
	 * 
	 * Here is the GET/POST/PUT/DELETE first Endpoints for the "drinkshop"
	 * More routes can be copied from this or redesigned.
	 *
	 * mongoDB collection
	 * 
	 * */
	app.route('/products')
		.get((req, res, next) => {
			// Customer Middleware can go here too!
			console.log(`Request from: ${req.originalUrl}`);
			console.log(`Request type: ${req.method}`);
			next();
		}, getProducts)

		// Products - POST endpoint
		.post(addNewProduct);

	app.route('/products/:productId')

		// Products ID - GET specific contact by id
		.get(getProductWithId)

		// Product ID - PUT request
		.put(updateProduct)

		// Product id - DELETE request
		.delete(deleteProduct);

	app.route('/customers/')
		.get((req, res, next) => {
			// Middleware
			console.log(`Request from: ${req.originalUrl}`);
			console.log(`Request type: ${req.method}`);
			next();
		}, getCustomers)
	// could add new customers here with .post(addNewCustomer);
	// maybe later
	;
	app.route('/customers/:customerId')
		.get(getCustomerByEmail);

};

export default routes;
