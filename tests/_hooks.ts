import {start, stop} from '../src/lifecycle';
import {nullary} from '../src/algebra/functions';
import db from "../src/db";

type DoneFunction = () => {};

export const mochaHooks = {
	beforeAll(done: DoneFunction) {
		start({queues: false, server: true})
			.then(() => {
				db.migrate.latest().then(() => {
					done()
				})
			})
			.catch(err => console.log(err));
	},

	afterAll(done: DoneFunction) {
		db.migrate.rollback(undefined, true).then(() => {
			stop()
				.then(() => {
					done();
				}).catch(err => console.log(err));
		}).catch(err => console.log(err));

	},
};
