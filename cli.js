#!/usr/bin/env node
import {spawn} from 'node:child_process';
import process from 'node:process';
import gif2webp from './index.js';

const input = process.argv.slice(2);

spawn(gif2webp, input, {stdio: 'inherit'})
	.on('exit', process.exit);
