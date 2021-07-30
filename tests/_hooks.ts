import { start, stop } from '../src/lifecycle';
import { nullary } from '../src/algebra/functions';

type DoneFunction = () => {};

export const mochaHooks = {
	beforeAll(done: DoneFunction) {
		start({ queues: true, server: true })
			.then(nullary(done));
		// done();
	},
	afterAll(done: DoneFunction) {
		stop()
			.then(nullary(done));
		// done();
	},
};
