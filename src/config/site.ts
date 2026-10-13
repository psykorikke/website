// Central site settings. Edit names, navigation and contact details here.

export const site = {
  name: 'Hjernevaerket',
  // Wordmark is split in two so the second half can be rendered bold.
  wordmark: ['Hjerne', 'vaerket'] as const,
  description: 'Hjernevaerket – viden, ro og retning for hjernen.',
  email: 'kontakt@hjernevarket.dk',
  cta: { label: 'Book en samtale', href: '/kontakt' },
};

export const nav = [
  { label: 'Forside', href: '/' },
  { label: 'Om', href: '/om' },
  { label: 'Forløb', href: '/forloeb' },
  { label: 'Kontakt', href: '/kontakt' },
];

/** Prefix an internal path with the site's base path (needed on GitHub Pages). */
export function url(path = '/'): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  if (/^(https?:|mailto:|tel:|#)/.test(path)) return path;
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}
