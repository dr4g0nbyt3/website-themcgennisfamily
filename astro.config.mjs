import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import pagefind from './pagefind.integration.js';

export default defineConfig({
  site: 'https://www.themcgennisfamily.com',
  integrations: [
    tailwind(),
    sitemap({
      customPages: [
        'https://www.themcgennisfamily.com',
        'https://www.themcgennisfamily.com/about',
        'https://www.themcgennisfamily.com/family',
        'https://www.themcgennisfamily.com/businesses',
        'https://www.themcgennisfamily.com/blog'
      ]
    }),
    pagefind()
  ],
  output: 'static',
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto'
  }
});
