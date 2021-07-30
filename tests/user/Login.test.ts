import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import { del, User } from '../../src/services/user';
import config from '../../src/config';
import { Done } from 'mocha';
import { HttpStatus } from '../../src/http/status';
import { actingAs } from '../TestCase';
import UserFactory from '../../src/db/factories/UserFactory';

const serverUrl = config.http.baseUrl;
chai.use(chaiHttp);

suite('User Login');

let user: User;

before(async function () {
	// create a user
	user = await UserFactory();
});

after(async function () {
	await del(user.id);
})

test('user receives jwt token after login' , function (done) {
	expect(user).to.have.property('id');
	// send a request
	chai.request(serverUrl)
		.post('/user/jwt')
		.send({ password: 'password', email: user.email })
		.end((err, res) => {
			if (err) done(err);
			expect(res.body).to.haveOwnProperty('jwt');
			done();
		});
});

test('cant login with invalid credentials' , function (done:Done) {
	chai.request(serverUrl)
		.post('/user/jwt')
		.send({ password: 'wrongPassword!', email: 'user.email' })
		.end((err, res) => {
			if (err) done(err);
			expect(res.status).equals(HttpStatus.UnprocessableEntity);
			done();
		});
})

test('Can renew JWT token' , function (done:Done) {
			actingAs(user,  {type: 'post' , route: '/auth/user/jwt'})
			.end((err, res) => {
				if (err) done(err);
				expect(res.body).to.haveOwnProperty('jwt');
				done();
			});
});

test('Can access restricted routes with jwt' , function (done:Done) {
		actingAs(user , {type:'get' , route: '/auth/goodbye'})
		.end((err, res) => {
			if (err) done(err);
			expect(res.text).to.equal(`goodbye ${user.email}`);
			done();
		});
})
