'use strict';
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
		await binBuild.url('https://github.com/webmproject/libwebp/archive/v0.6.0.zip', [
			`mkdir -p ${bin.dest()}`,
			`make -f makefile.unix examples/gif2webp && mv ./examples/gif2webp ${bin.path()}`
		]);

		log.success('gif2webp built successfully');
	} catch (error) {
		log.error(error.stack);
	}
});
