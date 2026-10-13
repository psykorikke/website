# AGENTS.md

Guidance for AI coding agents (Claude and others) working in this repository.

## Project

- **Name:** Hjernevaerket
- **Repository:** https://github.com/psykorikke/website
- **Live site:** https://hjernevaerket.dk (custom domain on GitHub Pages)

## Tech stack (mandatory)

**The website must be built with Astro and Tailwind CSS.** Do not introduce other frameworks (React, Vue, Svelte, etc.), other CSS frameworks or CSS-in-JS. New styling uses Tailwind utilities or tokens/utilities defined in `src/styles/global.css`.

- **Framework:** [Astro](https://astro.build) (static output, no SSR adapter)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com) via the `@tailwindcss/vite` plugin
  - Tailwind is configured in CSS (`src/styles/global.css` with `@import "tailwindcss"` and `@theme`), not in a `tailwind.config.js`.
  - Prefer Tailwind utility classes over custom CSS.
- **Package manager:** npm (commit `package-lock.json`; CI uses `npm ci`)
- **Node.js:** 22 (>= 22.12.0)

## Hosting & deployment

- Hosted on **GitHub Pages** for this repository (a *project* site).
- Deployed by the GitHub Action `.github/workflows/deploy.yml` on **every push to `main`** (and manually via `workflow_dispatch`).
- The workflow runs on **GitHub's public hosted runners** (`ubuntu-latest`). Do not switch to self-hosted runners.
- Pipeline: `npm ci` → `npm run build` → `npm run check` → upload `dist/` with `actions/upload-pages-artifact` → `actions/deploy-pages` → `verify` job checks the live site.
- Repository setting required: *Settings → Pages → Build and deployment → Source: GitHub Actions*.
- Custom domain **hjernevaerket.dk**, served from the domain root. `astro.config.mjs` sets `site: 'https://hjernevaerket.dk'` and **no `base`**; `public/CNAME` contains the domain.
  - Do not add a `base` path while the custom domain is in use — it breaks all CSS/JS/asset URLs (404s).
  - Still build internal links with `url()` from `src/config/site.ts` so a base path can be reintroduced in one place if hosting changes.
- `scripts/check-site.mjs` (`npm run check`) verifies every internal link and asset. CI runs it on `dist/` before upload, and the `verify` job runs it against the live site after deploy — a red `verify` job means the deployed site is broken.

## Language

- The site's **primary language is Danish** (`da`).
- All user-facing text (page content, titles, meta descriptions, alt text, buttons, error pages) must be written in Danish.
- Keep `<html lang="da">` in the layout and `og:locale` set to `da_DK`.
- Code, comments, commit messages and documentation like this file may be in English.

## Project structure

```
public/                       Static files copied as-is (favicon, images, CNAME)
src/config/site.ts            Site name, navigation, contact info, url() helper
src/layouts/Layout.astro      Page shell (head/meta, header, footer)
src/components/               Shared components (Header, Footer, Logo, PageHeader, SectionHeading)
src/components/home/          Front page sections (Hero, Intro, Offerings, ...)
src/pages/                    File-based routes (index, om, forloeb, kontakt, ...)
src/styles/global.css         Tailwind entry, design tokens (@theme) and utilities
astro.config.mjs              Astro config (site, base, i18n, Tailwind plugin)
.github/workflows/            GitHub Pages deploy workflow
```

## Design system

- Warm, calm look: cream backgrounds (`cream-*`), tan accent (`sand-*`), soft secondary tones (`rose-*`, `mist-*`) and near-black headings (`ink-*`). All colours are tokens in `src/styles/global.css` — use them instead of arbitrary hex values.
- Font: Poppins, **self-hosted** via `@fontsource/poppins`. Do not load fonts or other assets from Google Fonts or third-party CDNs (GDPR).
- Reusable utilities: `container-site`, `eyebrow` (small uppercase label), `btn-primary`, `btn-outline`, `link-underline`.
- Headings are bold with wide letter-spacing; hero/page titles are uppercase. Buttons are flat and square.
- Sections alternate background colours (cream-100 / cream-200 / white) for rhythm.
- Build internal links with `url()` from `src/config/site.ts`.

## Commands

| Command           | Purpose                                  |
| ----------------- | ---------------------------------------- |
| `npm install`     | Install dependencies                     |
| `npm run dev`     | Local dev server at `localhost:4321`     |
| `npm run build`   | Production build to `dist/`              |
| `npm run preview` | Preview the production build locally     |
| `npm run check`   | Check links/assets in `dist/` (or pass a URL to check a live site) |

## Rules for agents

1. Run `npm run build` and `npm run check` and make sure both succeed before committing.
2. Never commit `dist/`, `.astro/` or `node_modules/`.
3. Keep the site fully static — no server adapters or runtime secrets.
4. New pages use `src/layouts/Layout.astro` and Danish content.
5. Changes to `main` go live automatically, so keep `main` deployable.
6. Always use Astro and Tailwind CSS for the website (see *Tech stack*).
7. Never reference external design sources, themes, templates or sites used as inspiration in committed code, comments, commit messages or docs.
8. Keep pages accessible: semantic HTML, alt text, labelled form fields, visible focus states.
