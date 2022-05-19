import { defineConfig } from 'vite';
import { createVuePlugin } from 'vite-plugin-vue2';
import mpa from 'vite-plugin-mpa';
import eslintPlugin from 'vite-plugin-eslint';

const { resolve } = require('path');

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      pages: resolve(__dirname, 'src/pages')
    }
  },
  plugins: [
    createVuePlugin(),
    mpa({
      open: false,
      scanDir: 'src/pages',
      scanFile: 'main.ts',
      filename: 'vite.html'
    }),
    eslintPlugin()
  ]
});
