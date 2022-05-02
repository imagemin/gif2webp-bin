import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import {fileURLToPath} from 'node:url';
import test from 'ava';
import {execa} from 'execa';
import {temporaryDirectory} from 'tempy';
import binCheck from 'bin-check';
import binBuild from 'bin-build';
import compareSize from 'compare-size';
import {readChunk} from 'read-chunk';
import isWebp from 'is-webp';
import bin from '../index.js';

test('rebuild the gif2webp binaries', async t => {
	// Skip the test on Windows
	if (process.platform === 'win32') {
		t.pass();
		return;
	}

	const temporary = temporaryDirectory();
	const source = fileURLToPath(new URL('../vendor/source/libwebp-1.1.0.tar.gz', import.meta.url));

	await binBuild.file(source, [
		`mkdir -p ${temporary}`,
		`make -f makefile.unix examples/gif2webp && mv ./examples/gif2webp ${path.join(temporary, 'gif2webp')}`,
	]);

	t.true(fs.existsSync(path.join(temporary, 'gif2webp')));
});

test('return path to binary and verify that it is working', async t => {
	t.true(await binCheck(bin, ['-help']));
});

test('convert a GIF to WebP', async t => {
	const temporary = temporaryDirectory();
	const src = fileURLToPath(new URL('fixtures/test.gif', import.meta.url));
	const dest = path.join(temporary, 'test.webp');
	const args = [
		src,
		'-o',
		dest,
	];

	await execa(bin, args);
	const result = await compareSize(src, dest);

	t.true(result[dest] < result[src]);
	t.true(isWebp(await readChunk(dest, {
		length: 12,
		startPosition: 0,
	})));
});
