import process from 'node:process';
import {parentPort} from 'node:worker_threads';

parentPort.on('message', message => {
	parentPort.postMessage({
		name: 'worker1',
		data: message,
		time: new Date().toISOString(),
	});
	process.exit(0);
});
