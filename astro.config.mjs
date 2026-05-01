import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import pagefind from './pagefind.integration.js';

export default defineConfig({
  site: 'https://www.themcgennisfamily.com',
  integrations: [
    tailwind(),
    sitemap(),
    pagefind()
  ],
  output: 'static',
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto'
  }
});
