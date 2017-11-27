import dlv from 'dlv';

function sleep(ms) {
	return new Promise(function (r) { return setTimeout(r, ms); });
}

function toArray(val) {
	return Array.isArray(val) ? val : val == null ? [] : [val];
}

function isReady(arr) {
	var fns = toArray(arr).map(function (x) { return dlv(window, x) !== void 0; });
	return new Promise(function (r) {
		return Promise.all(fns).then(function (vals) { return vals.every(Boolean); }).then(function (bool) {
			return bool ? r() : sleep(10).then(function (_) { return isReady(arr).then(r); });
		});
	});
}

export default isReady;
