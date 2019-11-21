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
