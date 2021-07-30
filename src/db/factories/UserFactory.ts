
// create a user
import { create } from '../../services/user';
import faker from 'faker';

export default async function () {
	return await create({
		email: faker.internet.email(),
		enabled: true,
		password: 'password',
		minJwtIat: (new Date((new Date().setFullYear(2020)))),
	})
}
