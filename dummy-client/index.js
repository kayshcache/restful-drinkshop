'use strict'

const api = 'http://localhost:3000';

// An immediately invoked main function expression for the fun of it.
(function() {
	switch (location.pathname) {	
		case '/':
			getRequestFrom(api, '/products/')
			.then(products => products.map(appendListItemsToDom));
			displayTable('/average/');
			displayTable('/products/');
			console.log(location.search.slice(4));
			break;
		case '/customers.html':
			displayTable('/customers/');
			break;
		case '/orders.html':
			displayTable('/orders/');
			break;
		case '/order.html':
			displayTable(`/orders/${location.search.slice(4)}`);
			break;
		default:
			console.log('something is up with the switch');
	}
})();

// Old school XHR for the fun of it combined with Promise instead of jQuery
function getRequestFrom(url, route) {
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
function appendListItemsToDom(productObject) {
	const menu = document.querySelector('#xhr-menu')
	const item = document.createElement('li')
	item.textContent = `${productObject.title}: ${productObject.price}`;
	menu.appendChild(item);
}

// Generic API request and tabularize the response for DOM
async function displayTable(endpoint) {
	// Fetch the JSON response object and parse to Javascript object
	const uri = api + endpoint;
	const response = await fetch(uri);
	const data = await response.json();

	// Select the table tag in DOM
	const selector = endpoint == '/average/' && '#average' || '#main-table';
	const table = document.querySelector(selector);

	// Table head from response object keys
	const tableHeader = table.createTHead();
	const headerRow = tableHeader.insertRow();
	Object.keys(data[0]).forEach(headingKey => {
		const headerCell = headerRow.insertCell();
		headerCell.innerHTML = headingKey;
	});
	if(endpoint == '/orders/') {
		const headerDetails = headerRow.insertCell();
		headerDetails.innerHTML = 'Details';
	}

	// Fill the table with rows from the database records - values from the response object
	data.forEach(obj => {
		const tableRow = document.createElement('TR');
		Object.values(obj).forEach(value => {
			const cell = document.createElement('TD');
			cell.innerHTML = value;
			tableRow.appendChild(cell);
		});
		if(endpoint == '/orders/') {
			const link = document.createElement('A');
			link.text = 'Order Breakdown';
			link.href = `order.html?id=${obj.orderNumber}`;
			const detailCell = document.createElement('TD');
			detailCell.appendChild(link);
			tableRow.appendChild(detailCell);
		}
		table.appendChild(tableRow);
	});
}

