// create a user
import { faker } from '@faker-js/faker';
import { create } from '../../services/user';

export default async function userFactory() {
	return create({
		email: faker.internet.email(),
		enabled: true,
		password: 'password',
		minJwtIat: (new Date((new Date().setFullYear(2020)))),
	});
}
