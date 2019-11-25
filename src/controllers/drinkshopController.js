import mongoose from 'mongoose';
import { ProductSchema, CustomerSchema } from '../models/drinkshopModels';

const Product = mongoose.model('Product', ProductSchema);
const Customer = mongoose.model('Customer', CustomerSchema);

export const addNewProduct = (req, res) => {
	let newProduct = new Product(req.body);

	newProduct.save((err, product) => {
		if (err) {
			res.send(err);
		}
		res.json(product);
	});
};

export const getProducts = (req, res) => {
	// Can pass search params as an object
	// Second arg is callback function declaration
	Product.find({}, (err, product) => {
		if (err) {
			res.send(err);
		}
		res.json(product);
	});
};

export const getProductWithId = (req, res) => {
	Product.findById(req.params.productId, (err, product) => {
		if (err) {
			res.send(err);
		}
		res.json(product);
	});
};

export const updateProduct = (req, res) => {
	Product.findOneAndUpdate({ _id: req.params.productId }, req.body, { new: true }, (err, product) => {
		if (err) {
			res.send(err);
		}
		res.json(product);
	});
};

export const deleteProduct = (req, res) => {
	Product.deleteOne({ _id: req.params.productId }, (err, product) => {
		if (err) {
			res.send(err);
		}
		res.json({ message: 'Successfully deleted product' });
	});
};

export const getTotalCost = (req, res) => {
	//	populate "https://mongoosejs.com/docs/populate.html"

};

export const getCustomers = (req, res) => {
	Customer.find({}, (err, customer) => {
		if (err) {
			res.send(err);
		}
		res.json(customer);
	});

};

export const getCustomerByEmail = (req, res) => {
	Customer.findOne({ "email": req.params.customerId }, (err, customer) => {
		if (err) {
			res.send(err);
		}
		res.json(customer);
	});
}