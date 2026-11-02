import { defineConfig } from 'vite';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const pages = existsSync('.pages.json') ? JSON.parse(readFileSync('.pages.json', 'utf8')) : ['index.html'];

export default defineConfig({
  root: 'app',
  base: process.env.BASE || '/',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    assetsInlineLimit: 0,
    rollupOptions: {
      input: Object.fromEntries(pages.map((p) => [p.replace(/\/?index\.html$/, '') || 'home', resolve('app', p)])),
    },
  },
});
