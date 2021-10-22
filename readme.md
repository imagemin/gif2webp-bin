# gif2webp-bin ![GitHub Actions Status](https://github.com/imagemin/gif2webp-bin/workflows/test/badge.svg?branch=main)

> [WebP](https://developers.google.com/speed/webp/) is a modern image format that provides superior lossless and lossy compression for images on the web. Using WebP, webmasters and web developers can create smaller, richer images that make the web faster.

## Install

```
$ npm install --save gif2webp-bin
```

## Usage

```js
import {execFile} from 'node:child_process';
import gif2webp from 'gif2webp-bin';

execFile(gif2webp, ['input.gif', '-o', 'outout.webp'], () => {
	console.log('Image converted!');
});
```

## CLI

```
$ npm install --global gif2webp-bin
```

```
$ gif2webp --help
```
