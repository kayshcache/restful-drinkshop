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

const createItems = (productsArray) => {
	return productsArray.map(productObject => {
                const menuList = document.querySelector('ul')
                const item = document.createElement('li')
                item.textContent = `${productObject.title}: $${productObject.price}`;
                menuList.appendChild(item);
	});
}

const api = 'http://localhost:9001/';

const getProductList = (api) => {
	return new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();
		xhr.open("GET", api);
		xhr.onload = () => resolve(JSON.parse(xhr.response));
		xhr.onerror = () => reject(xhr.statusText);
		xhr.send();
	});
}
getProductList(api).then(products => createItems(products));

