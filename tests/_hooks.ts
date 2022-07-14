import { start, stop } from '../src/lifecycle';
import { nullary } from '../src/algebra/functions';

type DoneFunction = () => {};

export const mochaHooks = {
	beforeAll(done: DoneFunction) {
		start({ queues: false, server: true })
			.then(() => done())
			.catch(err => console.log(err));
	},
	afterAll(done: DoneFunction) {
		stop()
			.then(() => done());
	},
};
