'use strict'

/*
const menuList = document.querySelector('ul');
const item = document.createElement('li')
item.textContent = "Example product: ";
menuList.appendChild(item);
const linkItem = document.querySelector('li');
const price = document.createTextNode('$4.99');
linkItem.appendChild(price);
menuList.innerHTML = '<li>Will display a list of menu items</li>'
*/

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

const fetchFrom = async (api, route, callback) => {
	const uri = api + route;
	const response = await fetch(uri);
	const responseJson = await response.json();
	const contents = responseJson.map(callback);
}

/* Display Customers and their orders
 **
 **
 **
 */
const createCustomerList = customerObject => {
	const pullOrderNumbers = order => order.id;
	const menu = document.querySelector('ul')
	const item = document.createElement('li')
	const email = customerObject.email;
	const detail = customerObject[email];
	const orders = detail.orders.map(order => order.id).toString();
	item.textContent = `${email}: ${detail.firstName}, order list: ${orders}`;
	menu.appendChild(item);
}

getRequestFrom(api, '/customers/')
	.then(customers => customers.map(createCustomerList));