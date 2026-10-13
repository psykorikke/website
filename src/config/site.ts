// Central site settings. Edit names, navigation and contact details here.

export const site = {
  name: 'Hjernevaerket',
  // Wordmark is split in two so the second half can be rendered bold.
  wordmark: ['Hjerne', 'vaerket'] as const,
  description:
    'Oplæg og workshops om mennesket på arbejdspladsen for kollega- og ledergrupper i brandvæsen, pædagogiske botilbud og frivillige organisationer – ved psykolog Rikke Gundorff.',
  owner: 'Rikke Gundorff',
  ownerTitle: 'Psykolog',
  email: 'kontakt@hjernevaerket.dk',
};

/** Prefix an internal path with the site's base path (needed on GitHub Pages). */
export function url(path = '/'): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  if (/^(https?:|mailto:|tel:|#)/.test(path)) return path;
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}
