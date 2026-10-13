// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Deployed to GitHub Pages on the custom domain https://hjernevaerket.dk (served from the root, so no `base`).
export default defineConfig({
  site: 'https://hjernevaerket.dk',
  trailingSlash: 'ignore',
  i18n: {
    defaultLocale: 'da',
    locales: ['da'],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
