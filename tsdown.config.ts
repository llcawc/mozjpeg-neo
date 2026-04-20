import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['./src/*.ts'],
  format: {
    esm: {
      fixedExtension: false,
      target: ['node20'],
    },
  },
  dts: {
    tsgo: true,
  },
  exports: {
    exclude: [/^bin*/],
  },
})
