'use strict';
const BinBuild = require('bin-build');
const log = require('logalot');
const bin = require('.');

bin.run(['-help'], err => {
	if (err) {
		log.warn(err.message);
		log.warn('gif2webp pre-build test failed');
		log.info('compiling from source');

		const builder = new BinBuild()
			.src('https://github.com/webmproject/libwebp/archive/v0.6.0.zip')
			.cmd(`mkdir -p ${bin.dest()}`)
			.cmd(`make -f makefile.unix examples/gif2webp && mv ./examples/gif2webp ${bin.path()}`);

		return builder.run(err => {
			if (err) {
				log.error(err.stack);
				return;
			}

			log.success('gif2webp built successfully');
		});
	}

	log.success('gif2webp pre-build test passed successfully');
});
