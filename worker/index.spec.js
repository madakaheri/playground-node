import {Worker} from 'node:worker_threads';
import test from 'ava';

function post(data) {
	return new Promise(resolve => {
		const worker = new Worker(new URL('workers/worker1.js', import.meta.url));
		worker.postMessage(data);
		worker.on('message', event => {
			console.log(event);
			resolve();
		});
	});
}

test('worker', async t => {
	function * generator() {
		let i = 0;

		while (i < 100) {
			yield i++;
		}
	}

	// for (const index of generator()) {
	// 	// eslint-disable-next-line no-await-in-loop
	// 	await post(index);
	// }

	await Promise.all(Array.from(generator()).map(index => post(index)));

	t.pass();
});
