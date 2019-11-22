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

const api = 'http://localhost:9001/';

const getRequestFrom = url => {
	return new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();
		xhr.open("GET", url);
		xhr.onload = () => resolve(JSON.parse(xhr.response));
		xhr.onerror = () => reject(xhr.statusText);
		xhr.send();
	});
}

const appendListItemsToDom = productObject => {
        const menu = document.querySelector('ul')
        const item = document.createElement('li')
        item.textContent = `${productObject.title}: $${productObject.price.toFixed(2)}`;
        menu.appendChild(item);
}

getRequestFrom(api).then(products => products.map(appendListItemsToDom));


// Now do the same thing underneith with fetch
const appendFetch = productObject => {
        const menu = document.querySelector('#fetch-menu')
        const item = document.createElement('li')
        item.textContent = `${productObject.title}: $${productObject.price.toFixed(2)}`;
        menu.appendChild(item);
        return item;
}

async function displayMenu(){
	const response = await fetch(api);
	const productList = await response.json();
	const products = productList.map(appendFetch);
}

displayMenu()