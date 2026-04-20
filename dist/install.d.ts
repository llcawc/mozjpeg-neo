//#region src/install.d.ts
/**
 * Ensures the binary is available and executable.
 * Throws an error if the binary is missing.
 * On Unix systems, sets executable permissions if needed.
 * Проверяет доступность бинарного файла и его исполняемость.
 * Если файл отсутствует, выбрасывает ошибку.
 * На Unix-системах устанавливает права на выполнение при необходимости.
 */
declare function ensureBinaryExecutable(): Promise<void>;
/**
 * Main installation process: checks for pre-built binary,
 * sets executable permissions, and tests its functionality.
 * Основной процесс установки: проверяем наличие предварительно собранного бинарника,
 * устанавливаем права на выполнение и тестируем его работоспособность.
 */
declare function install(): Promise<void>;
//#endregion
export { ensureBinaryExecutable, install };