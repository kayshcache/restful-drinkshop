import cruds from '../controllers/mysqlControllers';

const db = cruds();

const routes = (app) => {
	/* Drinkshop Home Route
	 * 
	 * Here is the GET/POST/PUT/DELETE first Endpoints for the "drinkshop"
	 * More routes can be copied from this or redesigned.
	 *
	 * */
	app.route('/products/')
		.get(logRequest, db.selectAll)

		// Products - POST endpoint
		.post(logRequest, db.insertProduct);

	app.route('/products/:product_id')

		// Product ID - PUT request used for Updating database!
		.put(logRequest, db.updatePrice)

		// Product id - DELETE request
		.delete(logRequest, db.deleteRecord);

	app.route('/average/')
		.get(db.getAveragePrice);

	app.route('/customers/')
		.get(logRequest, db.selectAll)
		.post(logRequest, db.insertCustomer);

	app.route('/orders/')
		.get(logRequest, db.selectOrders)
		.post(logRequest, db.insertOrder);

	app.route('/orders/:order_id')
		.get(logRequest, db.selectOrderById);

	app.route('/exports/')
		.get(logRequest, db.exportAll);
};

// Handmade middleware
function logRequest(req, res, next) {
	console.log(`Request from: ${req.originalUrl}`);
	console.log(`Request type: ${req.method}`);
	next();
}

export default routes;

