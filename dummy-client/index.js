'use strict'

const api = 'http://localhost:3000';

function main() {
	switch (location.pathname) {	
		case '/':
			getRequestFrom(api, '/products/')
			.then(products => products.map(appendListItemsToDom));
			displayList('/products/');
			displayList('/average/');
			console.log(location.search.slice(4));
			break;
		case '/customers.html':
			displayList('/customers/');
			break;
		case '/orders.html':
			displayList('/orders/');
			break;
		case '/order.html':
			displayList(`/orders/${location.search.slice(4)}`);
			break;
		default:
			console.log('something is up with the switch');
	}
}

// Old school XHR for the fun of it combined with Promise instead of jQuery
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

// Map callback for making the XHR version of the menu ftw!
const appendListItemsToDom = productObject => {
	const menu = document.querySelector('#xhr-menu')
	const item = document.createElement('li')
	item.textContent = `${productObject.title}: ${productObject.price}`;
	menu.appendChild(item);
}

main();

// Generic API request and listify the response for DOM
async function displayList(endpoint) {
	const uri = api + endpoint;
	const response = await fetch(uri);
	const list = await response.json();
	const listItems = list.map(obj => {
		const selector = endpoint == '/average/' && '#average' || '#main-list';
		const htmlList = document.querySelector(selector);
		const item = document.createElement('li');
		item.textContent = Object.entries(obj).join(': ');
		if(obj.orderNumber) {
			const link = document.createElement('A');
			link.text = 'Order Breakdown';
			link.href = `order.html?id=${obj.orderNumber}`;
			item.appendChild(link);
		}
		htmlList.appendChild(item);
		return item;
	});
}

