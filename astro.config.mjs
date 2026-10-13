// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Deployed as a GitHub Pages *project* site: https://psykorikke.github.io/website/
// If a custom domain is added later, change `site` to that domain and remove `base`.
export default defineConfig({
  site: 'https://psykorikke.github.io',
  base: '/website',
  trailingSlash: 'ignore',
  i18n: {
    defaultLocale: 'da',
    locales: ['da'],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
