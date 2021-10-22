import {fileURLToPath} from 'node:url';
import binBuild from 'bin-build';
import bin from './index.js';

bin.run(['-help']).then(() => {
	console.log('gif2webp pre-build test passed successfully');
}).catch(async error => {
	console.warn(error.message);
	console.warn('gif2webp pre-build test failed');
	console.info('compiling from source');

	try {
		const source = fileURLToPath(new URL('../vendor/source/libwebp-1.1.0.tar.gz', import.meta.url));

		await binBuild.url(source, [
			`mkdir -p ${bin.dest()}`,
			`make -f makefile.unix examples/gif2webp && mv ./examples/gif2webp ${bin.path()}`,
		]);

		console.log('gif2webp built successfully');
	} catch (error) {
		console.error(error.stack);
	}
});
