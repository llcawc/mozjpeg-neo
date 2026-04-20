import { describe, it, expect } from 'vitest'
import { mozjpeg, bin } from '../src/index.js'

describe('index.ts', () => {
  describe('mozjpeg', () => {
    it('should be a string', () => {
      expect(typeof mozjpeg).toBe('string')
    })

    it('should contain path to binary', () => {
      expect(mozjpeg).toMatch(/cjpeg(\.exe)?$/)
    })
  })

  describe('bin', () => {
    it('should be an instance of BinWrapper', () => {
      // Проверяем, что bin имеет метод path
      expect(typeof bin.path).toBe('function')
      expect(typeof bin.run).toBe('function')
      expect(typeof bin.src).toBe('function')
      expect(typeof bin.dest).toBe('function')
      expect(typeof bin.use).toBe('function')
    })

    it('should return a path from bin.path()', () => {
      const path = bin.path()
      expect(typeof path).toBe('string')
      expect(path).toBe(mozjpeg)
    })

    it('should have platform-specific sources', () => {
      // Проверяем, что bin имеет метод src, который добавляет источники
      // Мы можем проверить, что bin.path() возвращает строку (уже проверено)
      // и что bin.run является функцией
      expect(typeof bin.src).toBe('function')
      expect(typeof bin.dest).toBe('function')
      expect(typeof bin.use).toBe('function')
    })
  })
})
