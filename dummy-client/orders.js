'use strict'

const api = 'http://localhost:9001';

const getRequestFrom = (url, route) => {
	const uri = url + route;
	return new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();
		xhr.open("GET", uri);
		xhr.onload = () => resolve(JSON.parse(xhr.response));
		xhr.onerror = () => reject(xhr.statusText);
		xhr.send();
	});
}

/* Display Customers and their orders
 **
 **
 **
 */

const createOrderList = customerObject => {
	// Disect the customerObject from response JSON
	const email = customerObject.email;
	const details = customerObject[email];
	const orders = details.orders.map(order => order.id).toString();

	// Query and create list items for DOM
	const allCustomers = document.querySelector('ol')
	const customer = document.createElement('li')
	const customerDetails = document.createElement('ol')
	const detailItems = document.createDocumentFragment()

	customer.textContent = details.firstName;

	details.orders.map(order => {
		const element = document.createElement('li');
		element.textContent = order.id + ": Next up, get total prices";
		detailItems.appendChild(element);
	})

	customerDetails.appendChild(detailItems);
	customer.appendChild(customerDetails)
	allCustomers.appendChild(customer);
}

getRequestFrom(api, '/customers/')
	.then(customers => customers.map(createOrderList));