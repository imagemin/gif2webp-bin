'use strict';
const path = require('path');
const binBuild = require('bin-build');
const log = require('logalot');
const bin = require('.');

bin.run(['-help']).then(() => {
	log.success('gif2webp pre-build test passed successfully');
}).catch(async error => {
	log.warn(error.message);
	log.warn('gif2webp pre-build test failed');
	log.info('compiling from source');

	try {
		await binBuild.url(path.resolve(__dirname, '../vendor/source/libwebp-1.1.0.tar.gz'), [
			`mkdir -p ${bin.dest()}`,
			`make -f makefile.unix examples/gif2webp && mv ./examples/gif2webp ${bin.path()}`
		]);

		log.success('gif2webp built successfully');
	} catch (error) {
		log.error(error.stack);
	}
});
