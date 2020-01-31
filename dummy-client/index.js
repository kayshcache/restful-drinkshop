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

const api = 'http://localhost:3000';

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
const formatAddress = address => {
        const { streetNumber, street, city, postcode } = address;
        return `${streetNumber} ${street}, ${city}, ${postcode}`;
}

const createCustomerList = customerObject => {
        // Dissect the customerObject from response JSON
        const email = customerObject.email;
        const details = customerObject[email];
        const address = formatAddress(details.address);
        const orders = details.orders.map(order => order.id).toString();

        // Query and create list items for DOM
        const allCustomers = document.querySelector('#customers')
        const customer = document.createElement('li')
        const customerDetails = document.createElement('ul')
        const detailItems = document.createDocumentFragment()

        customer.textContent = details.firstName;

        [email, address, orders, ].map(detail => {
                const element = document.createElement('li');
                element.textContent = detail;
                detailItems.appendChild(element);
        })

        customerDetails.appendChild(detailItems);
        customer.appendChild(customerDetails)
        allCustomers.appendChild(customer);
}

/* Display orders
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
        const allCustomers = document.querySelector('#orders')
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

/* Display Menu on homepage
 **
 **
 **
 */
const appendListItemsToDom = productObject => {
	const menu = document.querySelector('#xhr-menu')
	const item = document.createElement('li')
	item.textContent = `${productObject.title}: $${productObject.price}`;
	menu.appendChild(item);
}


/* Now do the same thing underneith with fetch
 */
const appendFetch = productObject => {
	const menu = document.querySelector('#fetch-menu')
	const item = document.createElement('li')
	item.textContent = `${productObject.title}: $${productObject.price}`;
	menu.appendChild(item);
	return item;
}

const displayMenu = async () => {
	const uri = api + '/products/'
	const response = await fetch(uri);
	const productList = await response.json();
	const products = productList.map(appendFetch);
}

switch (location.pathname) {	
	case '/':
		getRequestFrom(api, '/products/')
	        .then(products => products.map(appendListItemsToDom));
		displayMenu();
		break;
	case '/customers.html':
		getRequestFrom(api, '/customers/')
		.then(customers => customers.map(createCustomerList));
		break;
	case '/orders.html':
		getRequestFrom(api, '/customers/')
                .then(customers => customers.map(createOrderList));
                break;
	default:
		console.log('something is up with the switch');
}

