import fs from 'node:fs';
import process from 'node:process';
import {fileURLToPath} from 'node:url';
import BinWrapper from 'bin-wrapper';

const pkg = JSON.parse(fs.readFileSync(new URL('../package.json', import.meta.url)));
const url = `https://raw.github.com/imagemin/gif2webp-bin/v${pkg.version}/vendor/`;

const binWrapper = new BinWrapper()
	.src(`${url}macos/gif2webp`, 'darwin')
	.src(`${url}linux/gif2webp`, 'linux')
	.src(`${url}win/gif2webp.exe`, 'win32')
	.dest(fileURLToPath(new URL('../vendor', import.meta.url)))
	.use(process.platform === 'win32' ? 'gif2webp.exe' : 'gif2webp');

export default binWrapper;
