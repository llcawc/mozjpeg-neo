# mozjpeg-neo

[![npm version](https://img.shields.io/npm/v/mozjpeg-neo.svg?style=flat&logo=npm)](https://www.npmjs.com/package/mozjpeg-neo)
[![license](https://img.shields.io/npm/l/mozjpeg-neo.svg)](https://github.com/llcawc/mozjpeg-neo/blob/main/license)
[![Node.js Support](https://img.shields.io/node/v/mozjpeg-neo.svg?style=flat&logo=node.js)](package.json)
[![Downloads](https://img.shields.io/npm/dm/mozjpeg-neo.svg?style=flat&logo=npm)](https://www.npmjs.com/package/mozjpeg-neo)

> Fork of [imagemin/mozjpeg-bin](https://github.com/imagemin/mozjpeg-bin) with improvements and support for modern Node.js versions.

[mozjpeg](https://github.com/mozilla/mozjpeg) is a production-quality JPEG encoder that improves compression while maintaining compatibility with the vast majority of deployed decoders.

**Key difference**: this package does **not** compile the binary from source during installation. Instead, it uses pre‑built binaries for various platforms, which speeds up installation and avoids compilation issues.

## Changes and improvements over the original

- **Updated dependencies**: migration to modern Node.js versions (ESM, Node.js 18+ support).
- **Simplified installation**: no need to compile from source – ready‑to‑use binaries are included.
- **Enhanced TypeScript support**: type definitions provided (`dist/index.d.ts`).
- **Optimized package structure**: removed unnecessary files, kept only the essentials (`bin`, `dist`, `types`, `vendor`).
- **Fixed compatibility issues** with newer npm/pnpm versions.
- **Added development scripts** (`test`, `lint`, `fix`, `check`).
- **Support for pnpm** and other modern package managers.

## Install

```bash
$ npm install mozjpeg-neo
```

Or using pnpm:

```bash
$ pnpm add mozjpeg-neo
```

Or globally (for CLI usage):

```bash
$ npm install --global mozjpeg-neo
```

## Usage

### Programmatic API

```js
import { execFile } from "node:child_process";
import { mozjpeg } from "mozjpeg-neo";
import { join } from "node:path";
import { cwd } from "node:process";

const __dirname = cwd();
const file = join(__dirname, "test", "input.jpg");
const out = join(__dirname, "test", "output.jpg");

execFile(mozjpeg, ["-outfile", out, file], (error) => {
  if (error) throw error;
  console.log("Image minified!");
});
```

### CLI

After global installation:

```bash
$ mozjpeg --help
```

Example image compression:

```bash
$ mozjpeg -outfile output.jpg input.jpg
```

## No source compilation

This package **does not compile** mozjpeg from source code during installation. Instead, the `vendor/` folder contains pre‑built binaries for supported platforms (Windows, macOS, Linux). This avoids compiler dependency issues (CMake, NASM, etc.) and significantly speeds up the installation process.

If you need to build mozjpeg yourself, please refer to the [official mozjpeg repository](https://github.com/mozilla/mozjpeg#building).

## Supported platforms

- Windows (x64)
- macOS (x64, arm64)
- Linux (x64, arm64)

Binaries are automatically selected based on the OS and Node.js process architecture.

## Development

Clone the repository and install dependencies:

```bash
$ git clone https://github.com/llcawc/mozjpeg-neo.git
$ cd mozjpeg-neo
$ pnpm install   # or npm install
```

Run tests:

```bash
$ pnpm test
```

Linting and formatting:

```bash
$ pnpm lint
$ pnpm fix
$ pnpm check
```

## License

MIT License. Copyright (c) 2026 pasmurno by [llcawc](https://github.com/llcawc). Based on [imagemin/mozjpeg-bin](https://github.com/imagemin/mozjpeg-bin).

Made with ❤️ for beautiful architecture.
