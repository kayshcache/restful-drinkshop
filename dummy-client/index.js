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
	const menu = document.querySelector('ul')
	const item = document.createElement('li')
	item.textContent = `${customerObject.email}: $${customerObject[customerObject.email].firstName}`;
	menu.appendChild(item);
}

getRequestFrom(api, '/customers/')
	.then(customers => customers.map(appendListItemsToDom));


/* Display Menu on homepage
 **
 **
 **
 */
const appendListItemsToDom = productObject => {
	const menu = document.querySelector('ul')
	const item = document.createElement('li')
	item.textContent = `${productObject.title}: $${productObject.price.toFixed(2)}`;
	menu.appendChild(item);
}

getRequestFrom(api, '/products/')
	.then(products => products.map(appendListItemsToDom));


/* Now do the same thing underneith with fetch
 */
const appendFetch = productObject => {
	const menu = document.querySelector('#fetch-menu')
	const item = document.createElement('li')
	item.textContent = `${productObject.title}: $${productObject.price.toFixed(2)}`;
	menu.appendChild(item);
	return item;
}

const displayMenu = async () => {
	const uri = api + '/products/'
	const response = await fetch(uri);
	const productList = await response.json();
	const products = productList.map(appendFetch);
}

displayMenu();