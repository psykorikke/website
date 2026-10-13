// Central site settings. Edit names, navigation and contact details here.

export const site = {
  name: 'Hjernevaerket',
  // Wordmark is split in two so the second half can be rendered bold.
  wordmark: ['Hjerne', 'vaerket'] as const,
  description:
    'Oplæg og workshops om gruppedynamik for kollega- og ledergrupper i brandvæsen, pædagogiske botilbud og frivillige organisationer – ved autoriseret psykolog Rikke Gundorff.',
  owner: 'Rikke Gundorff',
  ownerTitle: 'Autoriseret psykolog',
  email: 'kontakt@hjernevaerket.dk',
  cta: { label: 'Book et oplæg', href: '/kontakt' },
};

export const nav = [
  { label: 'Forside', href: '/' },
  { label: 'Oplæg & workshops', href: '/oplaeg' },
  { label: 'Om Rikke', href: '/om' },
  { label: 'Kontakt', href: '/kontakt' },
];

/** Prefix an internal path with the site's base path (needed on GitHub Pages). */
export function url(path = '/'): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  if (/^(https?:|mailto:|tel:|#)/.test(path)) return path;
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}
