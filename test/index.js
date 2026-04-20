import { execFile } from 'node:child_process'
import { mozjpeg, bin } from '../dist/index.js'
import { join } from 'node:path'
import { cwd } from 'node:process'

const __dirname = cwd()
const file = join(__dirname, 'test', 'input.jpg')
const out = join(__dirname, 'test', 'output.jpg')

execFile(mozjpeg, ['-outfile', out, file], (error) => {
  if (error) throw error
  console.log('Image minified!')
})

console.log('mozjpeg:', mozjpeg)
console.log('binWrapper:', bin)
