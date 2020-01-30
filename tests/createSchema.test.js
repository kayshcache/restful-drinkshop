import buildDatabase from '../src/models/createSchema.js';
import { expect } from 'chai';
/* Handles a number of crud operations with dot syntax function execution
 *
 */
describe('Using CRUD insertProduct controller function', () =>{
	it('inserts values into the database and response with JSON outlining the result', () => {
		const expected = {};
		const actual = buildDatabase.createDatabase();
		expect(actual).to.deep.equal(expected);
	})
});

