import chai, {expect} from 'chai';
import config from '../../src/config';
import {signUrl} from "../../src/crypto/url";
import knexInstance from "../../src/db";

suite('Signed urls');
let signedUrl: string;

test('can connect to database', async () => {
	// test knex can connect to database
	knexInstance.raw('select 1+1 as result').then(() => {
		console.log('connected to database');
		expect(true).to.be.true;
	}).catch(() => {
		console.log('failed to connect to database');
		expect.fail('failed to connect to database');
	});

});
