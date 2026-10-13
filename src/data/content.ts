// Site content: specialisations (target sectors) and themes.
// Edit texts here; pages and front page sections read from this file.

export type Speciale = {
  slug: string;
  title: string;
  short: string;
  intro: string;
  /** Rikke's own connection to the sector. */
  experience: string;
  /** Typical situations the sector recognises. */
  recognise: string[];
  /** How the themes play out in this sector. */
  focus: string[];
  icon: string;
};

export const specialer: Speciale[] = [
  {
    slug: 'brandvaesen',
    title: 'Brandvæsen',
    short: 'For vagthold, holdledere og ledelse i beredskabet.',
    intro:
      'I brandvæsenet er man afhængig af hinanden, når det gælder. Det stiller særlige krav til tillid, roller og rangorden – både på udrykning og i hverdagen på stationen.',
    experience: 'Rikke har selv tre års erfaring som operativ brandmand og kender kulturen indefra.',
    recognise: [
      'Stærke vagthold, hvor det kan være svært at komme ind som ny',
      'Uskrevne regler om, hvem der bestemmer hvad på stationen',
      'Gnidninger mellem vagthold, stationer eller heltid og deltid',
      'Ledere, der skal stå i både det operative og det kollegiale',
    ],
    focus: [
      'Hierarkier og rangorden – den formelle og den uformelle',
      'Territorier mellem hold, stationer og funktioner',
      'Hvad der skaber og nedbryder sammenhold og motivation',
    ],
    icon: 'M12 3c.8 2.9 4.5 4.7 4.5 9a4.5 4.5 0 0 1-9 0c0-2.2 1.1-3.6 2.3-4.6.1 1.9.9 3.1 2.2 3.4C11.3 8.6 10.7 6 12 3z',
  },
  {
    slug: 'botilbud',
    title: 'Pædagogiske botilbud',
    short: 'For personale- og ledergrupper på bosteder og døgntilbud.',
    intro:
      'På et botilbud er arbejdet tæt, relationelt og ofte belastende. Personalegruppen skal hænge sammen på tværs af vagter og faggrupper – også når presset er højt.',
    experience: 'Rikke har bred erfaring fra pædagogiske tilbud i Aalborg Kommune.',
    recognise: [
      'Forskellige kulturer på dag-, aften- og nattevagt',
      '"Mine beboere" og "vores måde at gøre det på"',
      'Uformelle ledere i personalegruppen',
      'Motivation, der slides af travlhed og krævende situationer',
    ],
    focus: [
      'Territorialadfærd omkring beboere, opgaver og arbejdsgange',
      'Samarbejdsmønstre på tværs af vagter og faggrupper',
      'Motivation og fællesskab under vedvarende pres',
    ],
    icon: 'M3 11l9-7 9 7M5 9.5V20h14V9.5M10 20v-5h4v5',
  },
  {
    slug: 'frivillige',
    title: 'Frivillige organisationer',
    short: 'For bestyrelser, frivilliggrupper og koordinatorer.',
    intro:
      'Frivillige får ikke løn – de kommer, fordi de vil. Derfor er motivation, tilhørsforhold og uformel magt helt centrale, når fællesskabet skal fungere og holde.',
    experience: 'Rikke sidder selv i bestyrelsen i en frivillig organisation.',
    recognise: [
      'Erfarne frivillige og nye, der ikke helt finder ind',
      'Uklare roller mellem bestyrelse, ansatte og frivillige',
      'Ildsjæle, der brænder ud – eller brænder andre af',
      'Konflikter om, hvem der "ejer" en aktivitet',
    ],
    focus: [
      'Motivation: hvad får frivillige til at komme – og blive',
      'Uformelle hierarkier og magt uden titler',
      'Gruppeorganisering og klare roller',
    ],
    icon: 'M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.7A4 4 0 0 1 19 10c0 5.6-7 10-7 10z',
  },
];

export type Tema = { title: string; text: string; icon: string };

export const temaer: Tema[] = [
  {
    title: 'Territorialadfærd',
    text: 'Vi forsvarer det, vi oplever som "vores" – opgaver, rum, roller og kolleger. Det giver tryghed, men kan også skabe skel i gruppen.',
    icon: 'M5 21V4M5 4h11l-2 4 2 4H5',
  },
  {
    title: 'Hierarkier og magtkampe',
    text: 'Grupper finder altid en rangorden – også når den ikke står i organisationsdiagrammet. Når vi kan se den, kan vi tale om den.',
    icon: 'M10 3h4v4h-4zM4 15h4v4H4zM16 15h4v4h-4zM12 7v4M6 15v-4h12v4',
  },
  {
    title: 'Motivation',
    text: 'Hvad driver os til at gøre en indsats for fællesskabet – og hvad slukker lysten? Motivation hænger tæt sammen med status, tilhørsforhold og mening.',
    icon: 'M13 3 5 13h6l-1 8 8-10h-6z',
  },
  {
    title: 'Gruppeorganisering og samarbejdsmønstre',
    text: 'Hvordan er gruppen sat sammen, og hvilke mønstre gentager sig? Vi ser på roller, alliancer og de vaner, der styrer samarbejdet.',
    icon: 'M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM16 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM2 20c0-3 2.7-5 6-5s6 2 6 5M14 15.2c.6-.1 1.3-.2 2-.2 3.3 0 6 2 6 5',
  },
  {
    title: 'Teamprofilering',
    text: 'Et fælles sprog for forskelle i gruppen. Teamprofilering gør det lettere at forstå hinanden og bruge hinandens styrker.',
    icon: 'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z',
  },
];

export const formater = [
  {
    title: 'Oplæg',
    text: 'Et levende oplæg, der giver jer et fælles sprog for det, der sker i gruppen. Velegnet til personalemøder, temadage og konferencer.',
  },
  {
    title: 'Workshops',
    text: 'Et mere involverende forløb, hvor gruppen arbejder med egne mønstre og konkrete situationer fra hverdagen – og går derfra med aftaler, der kan bruges.',
  },
];

export const maalgrupper = ['Kollegagrupper', 'Ledergrupper'];

export const proces = [
  { title: 'Kontakt', text: 'Skriv en e-mail med et par ord om jeres gruppe, og hvad I gerne vil have ud af det.' },
  { title: 'Afstemning', text: 'Vi tager en snak om jeres hverdag og udfordringer, så indholdet passer til netop jer.' },
  { title: 'Oplæg eller workshop', text: 'Rikke kommer ud til jer. Indhold og længde tilpasses jeres ønsker og rammer.' },
];
