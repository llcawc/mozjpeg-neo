import { BinWrapper } from "./bin-wrapper.js";

//#region src/index.d.ts
/**
 * Pre‑configured BinWrapper instance for mozjpeg (cjpeg)
 * Предварительно настроенный экземпляр BinWrapper для mozjpeg (cjpeg)
 */
declare const binWrapper: BinWrapper;
/**
 * Resolved path to the mozjpeg binary
 * Определённый путь к бинарному файлу mozjpeg
 */
declare const mozjpeg: string;
/**
 * Exported mozjpeg binary path and bin wrapper instance
 * Экспортированный путь к бинарному файлу mozjpeg и экземпляр обёртки bin
 */
//#endregion
export { binWrapper as bin, mozjpeg };