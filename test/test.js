'use strict';
const fs = require('fs');
const path = require('path');
const test = require('ava');
const execa = require('execa');
const tempy = require('tempy');
const binCheck = require('bin-check');
const BinBuild = require('bin-build');
const compareSize = require('compare-size');
const readChunk = require('read-chunk');
const isWebp = require('is-webp');

test.cb('rebuild the gif2webp binaries', t => {
	const tmp = tempy.directory();

	new BinBuild()
		.src('https://github.com/webmproject/libwebp/archive/v0.6.0.zip')
		.cmd(`mkdir -p ${tmp}`)
		.cmd(`make -f makefile.unix examples/gif2webp && mv ./examples/gif2webp ${path.join(tmp, 'gif2webp')}`)
		.run(err => {
			t.ifError(err);
			t.true(fs.existsSync(path.join(tmp, 'gif2webp')));
			t.end();
		});
});

test('return path to binary and verify that it is working', async t => {
	t.true(await binCheck(require('../'), ['-help']));
});

test('convert a GIF to WebP', async t => {
	const tmp = tempy.directory();
	const src = path.join(__dirname, 'fixtures/test.gif');
	const dest = path.join(tmp, 'test.webp');
	const args = [
		src,
		'-o',
		dest
	];

	await execa(require('../'), args);
	const res = await compareSize(src, dest);

	t.true(res[dest] < res[src]);
	t.true(isWebp(await readChunk(dest, 0, 12)));
});
