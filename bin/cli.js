#!/usr/bin/env node
import process from 'node:process'

import { execa } from 'execa'

import { mozjpeg } from '../dist/index.js'

execa(mozjpeg, process.argv.slice(2), { stdio: 'inherit' }).on('exit', process.exit)
