const test = require('tape');
const fn = require('../dist/is-ready');

test('is-ready', t => {
	t.is(typeof fn, 'function', 'exports a function');
	t.end();
});
