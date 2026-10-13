# AGENTS.md

Guidance for AI coding agents (Claude and others) working in this repository.

## Project

- **Name:** Hjernevaerket
- **Repository:** https://github.com/psykorikke/website
- **Live site:** https://psykorikke.github.io/website/

## Tech stack (do not change without being asked)

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
- Pipeline: `npm ci` → `npm run build` → upload `dist/` with `actions/upload-pages-artifact` → `actions/deploy-pages`.
- Repository setting required: *Settings → Pages → Build and deployment → Source: GitHub Actions*.
- The site is served under the sub-path `/website`. `astro.config.mjs` sets `site` and `base` accordingly.
  - **Always** build internal links and asset URLs with `import.meta.env.BASE_URL` (never hard-code `/` as the root).
  - If a custom domain is added, update `site`, remove `base`, and add `public/CNAME`.

## Language

- The site's **primary language is Danish** (`da`).
- All user-facing text (page content, titles, meta descriptions, alt text, buttons, error pages) must be written in Danish.
- Keep `<html lang="da">` in the layout and `og:locale` set to `da_DK`.
- Code, comments, commit messages and documentation like this file may be in English.

## Project structure

```
public/                 Static files copied as-is (favicon, images, CNAME)
src/layouts/Layout.astro  Shared page shell (head, header, footer)
src/pages/              File-based routes (index.astro, 404.astro, …)
src/styles/global.css   Tailwind entry point and theme tokens
astro.config.mjs        Astro config (site, base, i18n, Tailwind plugin)
.github/workflows/      GitHub Pages deploy workflow
```

## Commands

| Command           | Purpose                                  |
| ----------------- | ---------------------------------------- |
| `npm install`     | Install dependencies                     |
| `npm run dev`     | Local dev server at `localhost:4321/website` |
| `npm run build`   | Production build to `dist/`              |
| `npm run preview` | Preview the production build locally     |

## Rules for agents

1. Run `npm run build` and make sure it succeeds before committing.
2. Never commit `dist/`, `.astro/` or `node_modules/`.
3. Keep the site fully static — no server adapters or runtime secrets.
4. New pages use `src/layouts/Layout.astro` and Danish content.
5. Changes to `main` go live automatically, so keep `main` deployable.
