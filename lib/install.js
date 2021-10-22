'use strict';
const path = require('path');
const binBuild = require('bin-build');
const bin = require('.');

bin.run(['-help']).then(() => {
	console.log('gif2webp pre-build test passed successfully');
}).catch(async error => {
	console.warn(error.message);
	console.warn('gif2webp pre-build test failed');
	console.info('compiling from source');

	try {
		await binBuild.url(path.resolve(__dirname, '../vendor/source/libwebp-1.1.0.tar.gz'), [
			`mkdir -p ${bin.dest()}`,
			`make -f makefile.unix examples/gif2webp && mv ./examples/gif2webp ${bin.path()}`
		]);

		console.log('gif2webp built successfully');
	} catch (error) {
		console.error(error.stack);
	}
});
