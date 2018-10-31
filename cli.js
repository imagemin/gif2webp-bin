#!/usr/bin/env node
'use strict';
const {spawn} = require('child_process');
const gif2webp = require('.');

const input = process.argv.slice(2);

spawn(gif2webp, input, {stdio: 'inherit'})
	.on('exit', process.exit);
