import cruds from '../src/controllers/mysqlControllers.js';
import { expect } from 'chai';
/* Handles a number of crud operations with dot syntax function execution
 *
 */
describe('Using CRUD insertProduct controller function', () =>{
	it('inserts values into the database and response with JSON outlining the result', () => {
		const expected = {};
		const actual = cruds.insertProduct();
		expect(actual).to.deep.equal(expected);
	})
});

