import userFactory from '../factories/UserFactory';

export async function seed(): Promise<void> {
	return userFactory();
}
