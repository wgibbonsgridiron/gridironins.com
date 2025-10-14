// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [sitemap(), mdx()],

  // Site URL - use custom domain if available, otherwise GitHub Pages URL
  site: process.env.PUBLIC_SITE_URL || 'https://gridironins.com',

  // Base path - for GitHub Pages subdirectory deployment, set to '/repo-name/'
  // For custom domain or root deployment, use '/'
  base: process.env.PUBLIC_BASE_PATH || '/',

  trailingSlash: 'ignore'
});