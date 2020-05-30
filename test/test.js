'use strict';
const fs = require('fs');
const path = require('path');
const test = require('ava');
const execa = require('execa');
const tempy = require('tempy');
const binCheck = require('bin-check');
const binBuild = require('bin-build');
const compareSize = require('compare-size');
const readChunk = require('read-chunk');
const isWebp = require('is-webp');
const bin = require('..');

test('rebuild the gif2webp binaries', async t => {
	const temporary = tempy.directory();

	await binBuild.url('https://github.com/webmproject/libwebp/archive/v0.6.0.zip', [
		`mkdir -p ${temporary}`,
		`make -f makefile.unix examples/gif2webp && mv ./examples/gif2webp ${path.join(temporary, 'gif2webp')}`
	]);

	t.true(fs.existsSync(path.join(temporary, 'gif2webp')));
});

test('return path to binary and verify that it is working', async t => {
	t.true(await binCheck(bin, ['-help']));
});

test('convert a GIF to WebP', async t => {
	const temporary = tempy.directory();
	const src = path.join(__dirname, 'fixtures/test.gif');
	const dest = path.join(temporary, 'test.webp');
	const args = [
		src,
		'-o',
		dest
	];

	await execa(bin, args);
	const result = await compareSize(src, dest);

	t.true(result[dest] < result[src]);
	t.true(isWebp(await readChunk(dest, 0, 12)));
});
