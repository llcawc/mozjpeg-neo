import { BinWrapper } from "./bin-wrapper.js";
import { join } from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
//#region src/index.ts
/**
* Path to the vendor directory containing platform-specific binaries
* Путь к директории vendor с платформозависимыми бинарными файлами
*/
const vendorPath = fileURLToPath(new URL("../vendor", import.meta.url));
/**
* Pre‑configured BinWrapper instance for mozjpeg (cjpeg)
* Предварительно настроенный экземпляр BinWrapper для mozjpeg (cjpeg)
*/
const binWrapper = new BinWrapper().src(join(vendorPath, "macos", "amd64", "cjpeg"), "darwin", "x64").src(join(vendorPath, "macos", "arm64", "cjpeg"), "darwin", "arm64").src(join(vendorPath, "linux", "amd64", "cjpeg"), "linux", "x64").src(join(vendorPath, "linux", "arm64", "cjpeg"), "linux", "arm64").src(join(vendorPath, "win", "x86", "cjpeg.exe"), "win32", "x86").src(join(vendorPath, "win", "x64", "cjpeg.exe"), "win32", "x64").dest(vendorPath).use(process.platform === "win32" ? "cjpeg.exe" : "cjpeg");
/**
* Resolved path to the mozjpeg binary
* Определённый путь к бинарному файлу mozjpeg
*/
const mozjpeg = binWrapper.path();
//#endregion
export { binWrapper as bin, mozjpeg };
