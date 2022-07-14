import chai, {expect} from 'chai';
import chaiHttp from 'chai-http';

import {del, User} from '../../src/services/user';
import {HttpStatus} from '../../src/http/status';
import {actingAs, Request} from '../TestCase';
import UserFactory from '../../src/db/factories/UserFactory';

chai.use(chaiHttp);

suite('User Login');

let user: User;

before(async () => {
	// create a user
	user = await UserFactory();
});

after(async () => {
	await del(user.id);
});

test('user receives jwt token after login', async () => {
	const response = await Request.post('/user/jwt')
		.send({password: 'password', email: user.email});

	expect(response).to.have.status(201);
	expect(response.body).to.haveOwnProperty('jwt');
});

test('cant login with invalid credentials', async () => {
	const res = await Request
		.post('/user/jwt')
		.send({password: 'wrongPassword!', email: 'user.email'});

	expect(res).to.have.status(HttpStatus.UnprocessableEntity);
});

test('Can renew JWT token', async () => {
	const res = await actingAs(user, {type: 'post', route: '/auth/user/jwt'});

	expect(res.body).to.haveOwnProperty('jwt');
});

test('Can access restricted routes with jwt', async () => {
	const res = await actingAs(user, {type: 'get', route: '/auth/goodbye'})

	expect(res.text).to.equal(`goodbye ${user.email}`);
});
