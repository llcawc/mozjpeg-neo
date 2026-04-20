//#region src/bin-wrapper.d.ts
/**
 * Binary wrapper for platform-specific executable distribution
 * Обёртка для бинарных файлов с поддержкой платформ
 */
declare class BinWrapper {
  private entries;
  private destination;
  private binaryName;
  /**
   * Add a source URL for a specific OS/architecture
   * Добавить источник для определённой ОС/архитектуры
   */
  src(url: string, os?: string, arch?: string): this;
  /**
   * Get or set the destination directory
   * Получить или установить целевую директорию
   */
  dest(): string;
  dest(directory: string): this;
  /**
   * Set the binary name to use
   * Установить имя бинарного файла для использования
   */
  use(binary: string): this;
  /**
   * Find the appropriate source URL for the current platform
   * Найти подходящий URL источника для текущей платформы
   */
  private findSrc;
  /**
   * Get the path to the binary (either source URL or local path)
   * Получить путь к бинарному файлу (либо URL источника, либо локальный путь)
   */
  path(): string;
  /**
   * Run the binary with given arguments
   * Запустить бинарный файл с указанными аргументами
   */
  run(args: string[]): Promise<void>;
  /**
   * Get the binary version (not implemented for gifsicle)
   * Получить версию бинарного файла (не реализовано для gifsicle)
   */
  version(): string;
}
//#endregion
export { BinWrapper };