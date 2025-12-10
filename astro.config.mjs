import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://themcgennisfamily.com',
  integrations: [
    tailwind(),
    sitemap({
      customPages: [
        'https://themcgennisfamily.com',
        'https://themcgennisfamily.com/about',
        'https://themcgennisfamily.com/family',
        'https://themcgennisfamily.com/businesses',
        'https://themcgennisfamily.com/blog'
      ]
    })
  ],
  output: 'static',
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto'
  }
});
