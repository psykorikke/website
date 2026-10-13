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
- Pipeline: `npm ci` → `npm run check:images` → `npm run build` → `npm run check` → upload `dist/` with `actions/upload-pages-artifact` → `actions/deploy-pages` → `verify` job checks the live site.
- Repository setting required: *Settings → Pages → Build and deployment → Source: GitHub Actions*.
- Custom domain **hjernevaerket.dk**, served from the domain root. `astro.config.mjs` sets `site: 'https://hjernevaerket.dk'` and **no `base`**; `public/CNAME` contains the domain.
  - Do not add a `base` path while the custom domain is in use — it breaks all CSS/JS/asset URLs (404s).
  - Still build internal links with `url()` from `src/config/site.ts` so a base path can be reintroduced in one place if hosting changes.
- `scripts/check-site.mjs` (`npm run check`) verifies every internal link and asset. CI runs it on `dist/` before upload, and the `verify` job runs it against the live site after deploy — a red `verify` job means the deployed site is broken.

## Business and message

- Hjernevaerket is a one-person business run by **Rikke Gundorff, autoriseret psykolog**.
- Offers **oplæg (talks) and workshops** for **kollegagrupper and ledergrupper** — not individual therapy or counselling.
- Perspective: **social-psychological / evolutionary**. Themes: territorialadfærd, hierarkier og magtkampe, motivation, gruppeorganisering og samarbejdsmønstre, teamprofilering. Focus on the special conditions in *mentale højrisikoerhverv*.
- **Three specialisations, which must always be clearly visible:** brandvæsen, pædagogiske botilbud, frivillige organisationer. Rikke's own background backs each one (3 years as operational firefighter; broad experience from pædagogiske tilbud in Aalborg Kommune; board member of a voluntary organisation).
- Copy refers to Rikke in the **third person** ("Rikke …", "hun …").
- Do not invent facts (prices, durations, clients, testimonials, credentials). Leave such details out until provided.
- All of this content lives in `src/data/content.ts` (specialisations, themes, formats, process) and `src/config/site.ts` (name, owner, e-mail, navigation). Edit texts there; pages read from them.

## Language

- The site's **primary language is Danish** (`da`).
- All user-facing text (page content, titles, meta descriptions, alt text, buttons, error pages) must be written in Danish.
- Keep `<html lang="da">` in the layout and `og:locale` set to `da_DK`.
- Code, comments, commit messages and documentation like this file may be in English.

## Images

Original photos can be very large (40 MB+). **Originals are never committed to git.**

- **Workflow:** put originals in `images-originals/` (git-ignored, any sub-folders) and run `npm run images`. This writes downscaled copies to `src/assets/images/` (same sub-folders), which *are* committed.
  - Copies are capped at **2560 px on the longest edge** (2× a full-width 1280 px layout) — close to the largest size the site displays, but big enough to scale up later (e.g. a full-width hero on a retina screen). Never upscaled.
  - EXIF orientation is applied and **all metadata (incl. GPS location) is stripped**.
  - Photos are saved as JPEG (quality 85); images with transparency as PNG.
  - For images only ever shown small (cards, portraits, thumbnails), use a smaller cap: `npm run images -- --max 1600`.
- **Hard limits** (`scripts/image-limits.mjs`), enforced by `npm run check:images` in CI — the deploy fails above them:
  - images under `src/`: max **2 MB** and max **3000 px** longest edge;
  - images under `public/` (served unoptimised): max **300 KB**.
- **Always render images with Astro's `<Image>` or `<Picture>` from `astro:assets`**, importing them from `src/assets/`. At build time Astro (sharp) generates resized WebP versions at the configured breakpoints (360–2560 px, see `image` in `astro.config.mjs`) with a `srcset`, so each visitor downloads a size close to what their screen shows.
  - Always set a meaningful Danish `alt` (or `alt=""` for purely decorative images).
  - Set `sizes` to match the layout, e.g. `sizes="(min-width: 768px) 50vw, 100vw"`, so the browser picks the right file.
  - Use `loading="eager"` + `fetchpriority="high"` only for the main above-the-fold image; leave others lazy (default).
- **Do not put photos in `public/`** — files there bypass optimisation. `public/` is only for favicons, the share image and similar small fixed files.
- Raw/editing formats (`.heic`, `.tif`, `.psd`, `.dng`, `.cr2`, `.nef`, `.arw`, …) are git-ignored; convert via `npm run images`.

## Responsive design (desktop and mobile)

The site must work well on **mobile phones, tablets and desktop**.

- Build mobile-first with Tailwind: base classes target phones, then `sm:` / `md:` / `lg:` add larger layouts.
- Test every change at least at **320 px, 375 px, 768 px, 1024 px and 1440 px** widths:
  - no horizontal scrolling or content cut off at any width (long words/e-mail addresses must wrap);
  - tap targets (links, buttons, menu toggles) at least ~32 px high on mobile, with spacing between them;
  - body text at least 15 px; headings scale down on small screens;
  - navigation works on mobile via the menu toggle in `Header.astro`.
- Images must be responsive (`<Image>` with `sizes`, see *Images*) — never fixed pixel widths wider than a phone screen.

## Project structure

```
images-originals/             Original, full-size images — git-ignored, never committed
public/                       Static files copied as-is (favicons, share image, CNAME)
src/assets/                   Logo and other images processed by Astro
src/assets/images/            Downscaled photos produced by `npm run images` (committed)
src/config/site.ts            Site name, owner, navigation, contact info, url() helper
src/data/content.ts           Specialisations, themes, formats and process texts
src/layouts/Layout.astro      Page shell (head/meta, header, footer)
src/components/               Shared components (Header, Footer, Logo, PageHeader, SectionHeading)
src/components/               Also: Icon (line icons from a path), CtaBand (e-mail call to action)
src/components/home/          Front page sections (Hero, Specialer, Perspektiv, Temaer, OmRikke, Format)
src/pages/                    Routes: index, oplaeg, om, kontakt, privatlivspolitik, 404
src/pages/specialer/[slug].astro  One page per specialisation, generated from src/data/content.ts
src/styles/global.css         Tailwind entry, design tokens (@theme) and utilities
scripts/                      Site/link checker, image preparation and image size check
astro.config.mjs              Astro config (site, image breakpoints, i18n, Tailwind plugin)
.github/workflows/            GitHub Pages deploy workflow
```

## Design system

- Colours come from the logo (`src/assets/logo.png`): **navy** (`navy-*`, logo background `#1a2431`), **ice blue** (`ice-*`, `#99cad4`) and **sand beige** (`sand-*`, `#bbb29e`). All colours are tokens in `src/styles/global.css` — use them instead of arbitrary hex values.
- Header, hero and footer are navy (`bg-navy-900`), matching the logo's own background exactly so the logo blends in. Keep the header fully opaque for the same reason. Content sections use light sand backgrounds (`sand-50` / `sand-100` / white).
- Logo assets: `src/assets/logo.png` (full logo) and `src/assets/brain-mark.png` (brain only, used in header/footer). Render them with Astro's `<Image>` so they are optimised. Favicons and the share image (`og-image.jpg`) live in `public/`.
- Text on light backgrounds: headings `navy-900`, body `navy-600`, small labels `ice-700` (for contrast). Light text on navy: `sand-200` body, `ice-300` accents.
- Font: Poppins (Latin subset), **self-hosted** via `@fontsource/poppins`. Do not load fonts or other assets from Google Fonts or third-party CDNs (GDPR).
- Reusable utilities: `container-site`, `eyebrow` (small uppercase label), `btn-primary` (ice blue), `btn-outline` (navy), `link-underline`.
- Headings are bold with wide letter-spacing; hero/page titles are uppercase. Buttons are flat and square.
- Build internal links with `url()` from `src/config/site.ts`.

## Commands

| Command           | Purpose                                  |
| ----------------- | ---------------------------------------- |
| `npm install`     | Install dependencies                     |
| `npm run dev`     | Local dev server at `localhost:4321`     |
| `npm run build`   | Production build to `dist/`              |
| `npm run preview` | Preview the production build locally     |
| `npm run check`   | Check links/assets in `dist/` (or pass a URL to check a live site) |
| `npm run images`  | Downscale originals from `images-originals/` into `src/assets/images/` |
| `npm run check:images` | Fail if any committed image exceeds the size limits |

## Rules for agents

1. Run `npm run check:images`, `npm run build` and `npm run check` and make sure all succeed before committing.
2. Never commit `dist/`, `.astro/` or `node_modules/`.
3. Keep the site fully static — no server adapters or runtime secrets.
   **There is no backend: do not add forms** (contact, newsletter, booking, etc.). Use `mailto:` links to the address in `src/config/site.ts` instead.
4. New pages use `src/layouts/Layout.astro` and Danish content.
5. Changes to `main` go live automatically, so keep `main` deployable.
6. Always use Astro and Tailwind CSS for the website (see *Tech stack*).
7. Never reference external design sources, themes, templates or sites used as inspiration in committed code, comments, commit messages or docs.
8. Keep pages accessible: semantic HTML, alt text, labelled form fields, visible focus states.
9. **Never commit original/full-size images.** Downscale them with `npm run images` first and render them with `<Image>`/`<Picture>` (see *Images*).
10. **Every page must work on both desktop and mobile devices** — verify at the widths listed under *Responsive design* before committing.
