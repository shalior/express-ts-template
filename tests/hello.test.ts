import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import config from '../src/config';
import { Request } from './TestCase';
import { Done } from 'mocha';

const serverUrl = config.http.baseUrl;
chai.use(chaiHttp);
// Routes test
suite('Routes test');

test('hello api' , function (done: Done){
	  Request.get('/hello-api')
		.end((err , res) => {
		if (err) done(err);
		expect(res.text).to.equals('hello, World!');
		done();
	});
});
