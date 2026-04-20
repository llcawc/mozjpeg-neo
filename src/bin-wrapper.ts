import { join } from 'node:path'
import process from 'node:process'

import { execa } from 'execa'

/**
 * Source entry definition for binary downloads
 * Определение источника для загрузки бинарных файлов
 */
interface SrcEntry {
  url: string
  os?: string
  arch?: string
}

/**
 * Binary wrapper for platform-specific executable distribution
 * Обёртка для бинарных файлов с поддержкой платформ
 */
class BinWrapper {
  private entries: SrcEntry[] = []
  private destination: string = ''
  private binaryName: string = ''

  /**
   * Add a source URL for a specific OS/architecture
   * Добавить источник для определённой ОС/архитектуры
   */
  src(url: string, os?: string, arch?: string): this {
    this.entries.push({ url, os, arch })
    return this
  }

  /**
   * Get or set the destination directory
   * Получить или установить целевую директорию
   */
  dest(): string
  dest(directory: string): this
  dest(directory?: string): this | string {
    if (directory === undefined) {
      return this.destination
    }
    this.destination = directory
    return this
  }

  /**
   * Set the binary name to use
   * Установить имя бинарного файла для использования
   */
  use(binary: string): this {
    this.binaryName = binary
    return this
  }

  /**
   * Find the appropriate source URL for the current platform
   * Найти подходящий URL источника для текущей платформы
   */
  private findSrc(): string | undefined {
    const { platform, arch } = process
    // Normalize architecture for compatibility with historical naming
    // Node.js uses 'ia32' for 32-bit x86, while binaries use 'x86'
    // Нормализуем архитектуру для совместимости с историческими обозначениями
    // Node.js использует 'ia32' для 32-битных x86, а в бинарниках используется 'x86'
    const normalizedArch = arch === 'ia32' ? 'x86' : arch
    for (const entry of this.entries) {
      const osMatch = entry.os === undefined || entry.os === platform
      const archMatch = entry.arch === undefined || entry.arch === normalizedArch
      if (osMatch && archMatch) {
        return entry.url
      }
    }
    return this.entries[0]?.url
  }

  /**
   * Get the path to the binary (either source URL or local path)
   * Получить путь к бинарному файлу (либо URL источника, либо локальный путь)
   */
  path(): string {
    // If we have src entries, use the matching one
    // Если есть записи источников, используем подходящую
    const src = this.findSrc()
    if (src) {
      return src
    }
    // Fallback to legacy behavior
    // Резервный вариант: использовать локальный путь
    if (!this.destination) {
      throw new Error('Destination not set')
    }
    if (!this.binaryName) {
      throw new Error('Binary name not set')
    }
    return join(this.destination, this.binaryName)
  }

  /**
   * Run the binary with given arguments
   * Запустить бинарный файл с указанными аргументами
   */
  async run(args: string[]): Promise<void> {
    const binaryPath = this.path()
    await execa(binaryPath, args, { stdio: 'inherit' })
  }

  /**
   * Get the binary version (not implemented for gifsicle)
   * Получить версию бинарного файла (не реализовано для gifsicle)
   */
  version(): string {
    // Return binary version if needed.
    // Since gifsicle doesn't provide version via this method,
    // we can return empty string or try to execute --version.
    // For simplicity, return empty string.
    // Возвращаем версию бинарника, если нужно.
    // Поскольку gifsicle не предоставляет версию через этот метод,
    // можно вернуть пустую строку или попытаться выполнить --version.
    // Для простоты возвращаем пустую строку.
    return ''
  }
}

// Export the BinWrapper class for use in other modules
// Экспортируем класс BinWrapper для использования в других модулях
export { BinWrapper }
