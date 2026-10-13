// Landing page content. Keep it short: each specialisation gets a couple of sentences.
// Written in the first person (Rikke's own voice).

export type Speciale = {
  /** Also the image file name: src/assets/images/specialer/<slug>.jpg (or .png/.webp). */
  slug: string;
  title: string;
  text: string;
  icon: string;
};

export const specialer: Speciale[] = [
  {
    slug: 'brandvaesen',
    title: 'Brandvæsen',
    text: 'Oplæg og workshops for vagthold og ledere. Om samarbejde, roller og sammenhold i et fag, hvor man er afhængig af hinanden.',
    icon: 'M12 3c.8 2.9 4.5 4.7 4.5 9a4.5 4.5 0 0 1-9 0c0-2.2 1.1-3.6 2.3-4.6.1 1.9.9 3.1 2.2 3.4C11.3 8.6 10.7 6 12 3z',
  },
  {
    slug: 'botilbud',
    title: 'Pædagogiske botilbud',
    text: 'For personale- og ledergrupper på bosteder. Om at stå sammen på tværs af vagter – også når presset er højt.',
    icon: 'M3 11l9-7 9 7M5 9.5V20h14V9.5M10 20v-5h4v5',
  },
  {
    slug: 'frivillige',
    title: 'Frivillige organisationer',
    text: 'For bestyrelser og frivilliggrupper. Om motivation, fællesskab og klare roller, når ingen får løn for at være der.',
    icon: 'M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.7A4 4 0 0 1 19 10c0 5.6-7 10-7 10z',
  },
];

/** "Om mig": Rikke's background, one line per area. */
export const erfaring = [
  'Tre års erfaring som operativ brandmand',
  'Bred erfaring fra pædagogiske tilbud i Aalborg Kommune',
  'Bestyrelsesmedlem i en frivillig organisation',
];
