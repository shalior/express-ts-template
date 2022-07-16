// create a user
import { faker } from '@faker-js/faker';
import { create, SaveUser } from '../../services/UserService';

export default async function userFactory(user ?: Partial<SaveUser>) {
	return create({
		email: user?.email ?? faker.internet.email(),
		enabled: user?.enabled ?? true,
		password: 'password',
		minJwtIat: user?.minJwtIat ?? (new Date((new Date().setFullYear(2020)))),
	});
}
