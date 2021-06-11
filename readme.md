# gif2webp-bin

> [WebP](https://developers.google.com/speed/webp/) is a modern image format that provides superior lossless and lossy compression for images on the web. Using WebP, webmasters and web developers can create smaller, richer images that make the web faster.

## Install

```
$ npm install --save gif2webp-bin
```

## Usage

```js
const {execFile} = require('child_process');
const gif2webp = require('gif2webp-bin');

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
