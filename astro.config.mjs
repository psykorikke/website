// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Deployed to GitHub Pages on the custom domain https://hjernevaerket.dk (served from the root, so no `base`).
export default defineConfig({
  site: 'https://hjernevaerket.dk',
  trailingSlash: 'ignore',
  // Images: every <Image>/<Picture> gets a responsive srcset in modern formats at build time,
  // so visitors download a size close to what their screen actually displays.
  image: {
    layout: 'constrained',
    breakpoints: [360, 480, 640, 768, 1024, 1280, 1600, 1920, 2560],
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: { limitInputPixels: false },
    },
  },
  i18n: {
    defaultLocale: 'da',
    locales: ['da'],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
