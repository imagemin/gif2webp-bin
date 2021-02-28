'use strict';
const path = require('path');
const BinWrapper = require('bin-wrapper');
const pkg = require('../package.json');

const url = `https://raw.github.com/imagemin/gif2webp-bin/v${pkg.version}/vendor/`;

module.exports = new BinWrapper()
	.src(`${url}macos/gif2webp`, 'darwin')
	.src(`${url}linux/gif2webp`, 'linux')
	.src(`${url}win/gif2webp.exe`, 'win32')
	.dest(path.resolve(__dirname, '../vendor'))
	.use(process.platform === 'win32' ? 'gif2webp.exe' : 'gif2webp');
