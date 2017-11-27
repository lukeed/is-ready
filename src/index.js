import dlv from 'dlv';

function sleep(ms) {
	return new Promise(r => setTimeout(r, ms));
}

function toArray(val) {
	return Array.isArray(val) ? val : val == null ? [] : [val];
}

export default function isReady(arr) {
	let fns = toArray(arr).map(x => dlv(window, x) !== void 0);
	return new Promise(r => {
		return Promise.all(fns).then(vals => vals.every(Boolean)).then(bool => {
			return bool ? r() : sleep(10).then(_ => isReady(arr).then(r));
		});
	});
}
