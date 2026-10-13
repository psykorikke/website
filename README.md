# Hjernevaerket

Hjemmeside bygget med [Astro](https://astro.build) og [Tailwind CSS](https://tailwindcss.com), udgivet på GitHub Pages:
https://hjernevaerket.dk

## Kom i gang

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # bygger til dist/
```

## Billeder

Store originaler (fx 40 MB fra kameraet) må ikke lægges i git:

1. Læg originalerne i mappen `images-originals/` (den ignoreres af git).
2. Kør `npm run images` – det laver nedskalerede kopier (maks. 2560 px) i `src/assets/images/`.
3. Brug billedet på siden med Astros `<Image>`-komponent. Astro laver selv de rigtige størrelser til mobil og desktop, når siden bygges.

## Udgivelse

Hver ændring på `main` bygges og udgives automatisk af GitHub Actions (`.github/workflows/deploy.yml`).

Se [AGENTS.md](AGENTS.md) for projektets regler og konventioner.
