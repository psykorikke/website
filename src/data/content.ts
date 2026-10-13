// Landing page content. Keep it short: each specialisation gets a couple of sentences.

export type Speciale = {
  title: string;
  text: string;
  icon: string;
};

export const specialer: Speciale[] = [
  {
    title: 'Brandvæsen',
    text: 'Oplæg og workshops for vagthold og ledere om rangorden, territorier og sammenhold. Rikke har selv tre års erfaring som operativ brandmand.',
    icon: 'M12 3c.8 2.9 4.5 4.7 4.5 9a4.5 4.5 0 0 1-9 0c0-2.2 1.1-3.6 2.3-4.6.1 1.9.9 3.1 2.2 3.4C11.3 8.6 10.7 6 12 3z',
  },
  {
    title: 'Pædagogiske botilbud',
    text: 'For personale- og ledergrupper, der skal hænge sammen på tværs af vagter og under pres. Rikke har bred erfaring fra pædagogiske tilbud i Aalborg Kommune.',
    icon: 'M3 11l9-7 9 7M5 9.5V20h14V9.5M10 20v-5h4v5',
  },
  {
    title: 'Frivillige organisationer',
    text: 'Om motivation, uformel magt og klare roller, når ingen får løn for at være der. Rikke sidder selv i bestyrelsen i en frivillig organisation.',
    icon: 'M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.7A4 4 0 0 1 19 10c0 5.6-7 10-7 10z',
  },
];
