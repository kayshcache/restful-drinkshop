import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const ProductSchema = new Schema({
	_id: {
		type: Number,
		required: 'Needs an ID',
	},
	title: {
		type: String,
		required: 'Name of product required',
	},
	price: {
		type: Number,
	},
	created_date: {
		type: Date,
		default: Date.now,
	},
});

export const CustomerSchema = new Schema({
	email: {
		type: String,
		required: 'Email required',
		// set: (str => str.toLowerCase()),
	},
	firstName: {
		type: String,
	},
	lastName: {
		type: String,
	},
	address: {
		type: Object,
	},
	orders: {
		type: Array,
	},
	created_date: {
		type: Date,
		default: Date.now,
	},
});