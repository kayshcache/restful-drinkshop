'use strict'

const api = 'http://localhost:3000';

function main() {
	switch (location.pathname) {	
		case '/':
			getRequestFrom(api, '/products/')
			.then(products => products.map(appendListItemsToDom));
			displayList('/products/');
			displayList('/average/');
			displayTable('/products/');
			console.log(location.search.slice(4));
			break;
		case '/customers.html':
			displayList('/customers/');
			displayTable('/customers/');
			break;
		case '/orders.html':
			displayList('/orders/');
			displayTable('/orders/');
			break;
		case '/order.html':
			displayList(`/orders/${location.search.slice(4)}`);
			displayTable(`/orders/${location.search.slice(4)}`);
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
	list.forEach(obj => {
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
	});
}

async function displayTable(endpoint) {
	const uri = api + endpoint;
	const response = await fetch(uri);
	const data = await response.json();

	// Table data creation
	const selector = endpoint == '/average/' && '#average' || '#main-table';
	const table = document.querySelector(selector);

	// Table head from response object keys
	const tableHeader = table.createTHead();
	const headerRow = tableHeader.insertRow();
	Object.keys(data[0]).forEach(headingKey => {
		const headerCell = headerRow.insertCell();
		headerCell.innerHTML = headingKey;
	});
	const headerDetails = headerRow.insertCell();
	headerDetails.innerHTML = 'Details';

	// Fill the table with the values from the response object
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

