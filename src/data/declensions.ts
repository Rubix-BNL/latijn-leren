// Latijnse naamvallen data voor VWO klas 2

export type Casus =
  | 'nominativus'
  | 'genitivus'
  | 'dativus'
  | 'accusativus'
  | 'ablativus'
  | 'vocativus';

export type Numerus = 'singularis' | 'pluralis';

export interface CasusInfo {
  naam: string;
  vraag: string;
  functie: string;
  afkorting: string;
}

export const casusInfo: Record<Casus, CasusInfo> = {
  nominativus: {
    naam: 'Nominativus',
    vraag: 'Wie? Wat?',
    functie: 'Onderwerp (subject)',
    afkorting: 'nom.',
  },
  genitivus: {
    naam: 'Genitivus',
    vraag: 'Van wie? Van wat?',
    functie: 'Bezit, deel van geheel',
    afkorting: 'gen.',
  },
  dativus: {
    naam: 'Dativus',
    vraag: 'Aan wie? Voor wie?',
    functie: 'Meewerkend voorwerp',
    afkorting: 'dat.',
  },
  accusativus: {
    naam: 'Accusativus',
    vraag: 'Wie? Wat? (lijdend)',
    functie: 'Lijdend voorwerp',
    afkorting: 'acc.',
  },
  ablativus: {
    naam: 'Ablativus',
    vraag: 'Door/met/van wie/wat?',
    functie: 'Bijwoordelijke bepaling',
    afkorting: 'abl.',
  },
  vocativus: {
    naam: 'Vocativus',
    vraag: 'Aanroep',
    functie: 'Aanspreekvorm',
    afkorting: 'voc.',
  },
};

export interface Declension {
  id: string;
  naam: string;
  beschrijving: string;
  geslacht: string;
  voorbeeldwoord: string;
  stam: string;
  betekenis: string;
  uitgangen: {
    singularis: Record<Casus, string>;
    pluralis: Record<Casus, string>;
  };
  vormen: {
    singularis: Record<Casus, string>;
    pluralis: Record<Casus, string>;
  };
}

export const declensions: Declension[] = [
  {
    id: 'decl-1',
    naam: '1e Declinatie',
    beschrijving: 'Woorden op -a (meestal vrouwelijk)',
    geslacht: 'vrouwelijk (femininum)',
    voorbeeldwoord: 'puella',
    stam: 'puell-',
    betekenis: 'meisje',
    uitgangen: {
      singularis: {
        nominativus: '-a',
        genitivus: '-ae',
        dativus: '-ae',
        accusativus: '-am',
        ablativus: '-ā',
        vocativus: '-a',
      },
      pluralis: {
        nominativus: '-ae',
        genitivus: '-ārum',
        dativus: '-īs',
        accusativus: '-ās',
        ablativus: '-īs',
        vocativus: '-ae',
      },
    },
    vormen: {
      singularis: {
        nominativus: 'puella',
        genitivus: 'puellae',
        dativus: 'puellae',
        accusativus: 'puellam',
        ablativus: 'puellā',
        vocativus: 'puella',
      },
      pluralis: {
        nominativus: 'puellae',
        genitivus: 'puellārum',
        dativus: 'puellīs',
        accusativus: 'puellās',
        ablativus: 'puellīs',
        vocativus: 'puellae',
      },
    },
  },
  {
    id: 'decl-2-m',
    naam: '2e Declinatie (mannelijk)',
    beschrijving: 'Woorden op -us (mannelijk)',
    geslacht: 'mannelijk (masculinum)',
    voorbeeldwoord: 'servus',
    stam: 'serv-',
    betekenis: 'slaaf',
    uitgangen: {
      singularis: {
        nominativus: '-us',
        genitivus: '-ī',
        dativus: '-ō',
        accusativus: '-um',
        ablativus: '-ō',
        vocativus: '-e',
      },
      pluralis: {
        nominativus: '-ī',
        genitivus: '-ōrum',
        dativus: '-īs',
        accusativus: '-ōs',
        ablativus: '-īs',
        vocativus: '-ī',
      },
    },
    vormen: {
      singularis: {
        nominativus: 'servus',
        genitivus: 'servī',
        dativus: 'servō',
        accusativus: 'servum',
        ablativus: 'servō',
        vocativus: 'serve',
      },
      pluralis: {
        nominativus: 'servī',
        genitivus: 'servōrum',
        dativus: 'servīs',
        accusativus: 'servōs',
        ablativus: 'servīs',
        vocativus: 'servī',
      },
    },
  },
  {
    id: 'decl-2-n',
    naam: '2e Declinatie (onzijdig)',
    beschrijving: 'Woorden op -um (onzijdig)',
    geslacht: 'onzijdig (neutrum)',
    voorbeeldwoord: 'templum',
    stam: 'templ-',
    betekenis: 'tempel',
    uitgangen: {
      singularis: {
        nominativus: '-um',
        genitivus: '-ī',
        dativus: '-ō',
        accusativus: '-um',
        ablativus: '-ō',
        vocativus: '-um',
      },
      pluralis: {
        nominativus: '-a',
        genitivus: '-ōrum',
        dativus: '-īs',
        accusativus: '-a',
        ablativus: '-īs',
        vocativus: '-a',
      },
    },
    vormen: {
      singularis: {
        nominativus: 'templum',
        genitivus: 'templī',
        dativus: 'templō',
        accusativus: 'templum',
        ablativus: 'templō',
        vocativus: 'templum',
      },
      pluralis: {
        nominativus: 'templa',
        genitivus: 'templōrum',
        dativus: 'templīs',
        accusativus: 'templa',
        ablativus: 'templīs',
        vocativus: 'templa',
      },
    },
  },
  {
    id: 'decl-3-m',
    naam: '3e Declinatie (m/v)',
    beschrijving: 'Consonantstammen (mannelijk/vrouwelijk)',
    geslacht: 'mannelijk/vrouwelijk',
    voorbeeldwoord: 'rex',
    stam: 'reg-',
    betekenis: 'koning',
    uitgangen: {
      singularis: {
        nominativus: '-/s',
        genitivus: '-is',
        dativus: '-ī',
        accusativus: '-em',
        ablativus: '-e',
        vocativus: '-/s',
      },
      pluralis: {
        nominativus: '-ēs',
        genitivus: '-um',
        dativus: '-ibus',
        accusativus: '-ēs',
        ablativus: '-ibus',
        vocativus: '-ēs',
      },
    },
    vormen: {
      singularis: {
        nominativus: 'rex',
        genitivus: 'regis',
        dativus: 'regī',
        accusativus: 'regem',
        ablativus: 'rege',
        vocativus: 'rex',
      },
      pluralis: {
        nominativus: 'regēs',
        genitivus: 'regum',
        dativus: 'regibus',
        accusativus: 'regēs',
        ablativus: 'regibus',
        vocativus: 'regēs',
      },
    },
  },
  {
    id: 'decl-3-n',
    naam: '3e Declinatie (onzijdig)',
    beschrijving: 'Consonantstammen (onzijdig)',
    geslacht: 'onzijdig (neutrum)',
    voorbeeldwoord: 'corpus',
    stam: 'corpor-',
    betekenis: 'lichaam',
    uitgangen: {
      singularis: {
        nominativus: '-/s',
        genitivus: '-is',
        dativus: '-ī',
        accusativus: '-',
        ablativus: '-e',
        vocativus: '-/s',
      },
      pluralis: {
        nominativus: '-a',
        genitivus: '-um',
        dativus: '-ibus',
        accusativus: '-a',
        ablativus: '-ibus',
        vocativus: '-a',
      },
    },
    vormen: {
      singularis: {
        nominativus: 'corpus',
        genitivus: 'corporis',
        dativus: 'corporī',
        accusativus: 'corpus',
        ablativus: 'corpore',
        vocativus: 'corpus',
      },
      pluralis: {
        nominativus: 'corpora',
        genitivus: 'corporum',
        dativus: 'corporibus',
        accusativus: 'corpora',
        ablativus: 'corporibus',
        vocativus: 'corpora',
      },
    },
  },
];

// Extra oefenwoorden per declinatie
export interface PracticeWord {
  woord: string;
  stam: string;
  betekenis: string;
  declinatieId: string;
}

export const practiceWords: PracticeWord[] = [
  // 1e declinatie
  { woord: 'aqua', stam: 'aqu-', betekenis: 'water', declinatieId: 'decl-1' },
  { woord: 'terra', stam: 'terr-', betekenis: 'aarde, land', declinatieId: 'decl-1' },
  { woord: 'via', stam: 'vi-', betekenis: 'weg', declinatieId: 'decl-1' },
  { woord: 'silva', stam: 'silv-', betekenis: 'bos', declinatieId: 'decl-1' },
  { woord: 'filia', stam: 'fili-', betekenis: 'dochter', declinatieId: 'decl-1' },

  // 2e declinatie mannelijk
  { woord: 'amicus', stam: 'amic-', betekenis: 'vriend', declinatieId: 'decl-2-m' },
  { woord: 'dominus', stam: 'domin-', betekenis: 'heer', declinatieId: 'decl-2-m' },
  { woord: 'filius', stam: 'fili-', betekenis: 'zoon', declinatieId: 'decl-2-m' },
  { woord: 'equus', stam: 'equ-', betekenis: 'paard', declinatieId: 'decl-2-m' },
  { woord: 'populus', stam: 'popul-', betekenis: 'volk', declinatieId: 'decl-2-m' },

  // 2e declinatie onzijdig
  { woord: 'bellum', stam: 'bell-', betekenis: 'oorlog', declinatieId: 'decl-2-n' },
  { woord: 'donum', stam: 'don-', betekenis: 'geschenk', declinatieId: 'decl-2-n' },
  { woord: 'oppidum', stam: 'oppid-', betekenis: 'stad', declinatieId: 'decl-2-n' },
  { woord: 'verbum', stam: 'verb-', betekenis: 'woord', declinatieId: 'decl-2-n' },
  { woord: 'periculum', stam: 'pericul-', betekenis: 'gevaar', declinatieId: 'decl-2-n' },

  // 3e declinatie m/v
  { woord: 'miles', stam: 'milit-', betekenis: 'soldaat', declinatieId: 'decl-3-m' },
  { woord: 'pater', stam: 'patr-', betekenis: 'vader', declinatieId: 'decl-3-m' },
  { woord: 'mater', stam: 'matr-', betekenis: 'moeder', declinatieId: 'decl-3-m' },
  { woord: 'dux', stam: 'duc-', betekenis: 'leider', declinatieId: 'decl-3-m' },
  { woord: 'urbs', stam: 'urb-', betekenis: 'stad', declinatieId: 'decl-3-m' },

  // 3e declinatie onzijdig
  { woord: 'nomen', stam: 'nomin-', betekenis: 'naam', declinatieId: 'decl-3-n' },
  { woord: 'tempus', stam: 'tempor-', betekenis: 'tijd', declinatieId: 'decl-3-n' },
  { woord: 'caput', stam: 'capit-', betekenis: 'hoofd', declinatieId: 'decl-3-n' },
  { woord: 'flumen', stam: 'flumin-', betekenis: 'rivier', declinatieId: 'decl-3-n' },
  { woord: 'iter', stam: 'itiner-', betekenis: 'reis, weg', declinatieId: 'decl-3-n' },
];
