// Latijnse werkwoordstijden data voor VWO klas 2

export type Tempus = 'praesens' | 'imperfectum' | 'perfectum' | 'plusquamperfectum';

export type Persona = '1s' | '2s' | '3s' | '1p' | '2p' | '3p';

export interface TempusInfo {
  naam: string;
  nederlandseNaam: string;
  uitleg: string;
  voorbeeld: string;
  afkorting: string;
}

export const tempusInfo: Record<Tempus, TempusInfo> = {
  praesens: {
    naam: 'Praesens',
    nederlandseNaam: 'Tegenwoordige tijd',
    uitleg: 'Wat nu gebeurt of een gewoonte is',
    voorbeeld: 'ik loop, ik houd van',
    afkorting: 'praes.',
  },
  imperfectum: {
    naam: 'Imperfectum',
    nederlandseNaam: 'Onvoltooid verleden tijd',
    uitleg: 'Wat in het verleden gaande was of herhaald werd',
    voorbeeld: 'ik liep, ik hield van',
    afkorting: 'impf.',
  },
  perfectum: {
    naam: 'Perfectum',
    nederlandseNaam: 'Voltooid tegenwoordige tijd',
    uitleg: 'Wat voltooid is met gevolg voor nu',
    voorbeeld: 'ik heb gelopen, ik heb gehouden van',
    afkorting: 'perf.',
  },
  plusquamperfectum: {
    naam: 'Plusquamperfectum',
    nederlandseNaam: 'Voltooid verleden tijd',
    uitleg: 'Wat voltooid was vóór iets anders in het verleden',
    voorbeeld: 'ik had gelopen, ik had gehouden van',
    afkorting: 'plqpf.',
  },
};

export interface PersonaInfo {
  naam: string;
  afkorting: string;
  nederlands: string;
}

export const personaInfo: Record<Persona, PersonaInfo> = {
  '1s': { naam: '1e persoon enkelvoud', afkorting: '1 sg.', nederlands: 'ik' },
  '2s': { naam: '2e persoon enkelvoud', afkorting: '2 sg.', nederlands: 'jij' },
  '3s': { naam: '3e persoon enkelvoud', afkorting: '3 sg.', nederlands: 'hij/zij/het' },
  '1p': { naam: '1e persoon meervoud', afkorting: '1 pl.', nederlands: 'wij' },
  '2p': { naam: '2e persoon meervoud', afkorting: '2 pl.', nederlands: 'jullie' },
  '3p': { naam: '3e persoon meervoud', afkorting: '3 pl.', nederlands: 'zij' },
};

export const personae: Persona[] = ['1s', '2s', '3s', '1p', '2p', '3p'];
export const tempora: Tempus[] = ['praesens', 'imperfectum', 'perfectum', 'plusquamperfectum'];

export interface Conjugation {
  id: string;
  naam: string;
  beschrijving: string;
  kenmerk: string;
  voorbeeldwoord: string;
  betekenis: string;
  stammen: {
    praesens: string;
    perfectum: string;
  };
  uitgangen: {
    praesens: Record<Persona, string>;
    imperfectum: Record<Persona, string>;
    perfectum: Record<Persona, string>;
    plusquamperfectum: Record<Persona, string>;
  };
  vormen: {
    praesens: Record<Persona, string>;
    imperfectum: Record<Persona, string>;
    perfectum: Record<Persona, string>;
    plusquamperfectum: Record<Persona, string>;
  };
}

// Persoonsuitgangen voor praesens/imperfectum (actief)
const praesensPersoonlijk: Record<Persona, string> = {
  '1s': '-o/-m',
  '2s': '-s',
  '3s': '-t',
  '1p': '-mus',
  '2p': '-tis',
  '3p': '-nt',
};

// Persoonsuitgangen voor perfectum
const perfectumUitgangen: Record<Persona, string> = {
  '1s': '-ī',
  '2s': '-istī',
  '3s': '-it',
  '1p': '-imus',
  '2p': '-istis',
  '3p': '-ērunt',
};

// Persoonsuitgangen voor plusquamperfectum
const plusquamperfectumUitgangen: Record<Persona, string> = {
  '1s': '-eram',
  '2s': '-erās',
  '3s': '-erat',
  '1p': '-erāmus',
  '2p': '-erātis',
  '3p': '-erant',
};

export const conjugations: Conjugation[] = [
  {
    id: 'conj-1',
    naam: '1e Conjugatie',
    beschrijving: 'Werkwoorden op -āre',
    kenmerk: '-ā- stam',
    voorbeeldwoord: 'amāre',
    betekenis: 'houden van, beminnen',
    stammen: {
      praesens: 'amā-',
      perfectum: 'amāv-',
    },
    uitgangen: {
      praesens: {
        '1s': '-ō',
        '2s': '-ās',
        '3s': '-at',
        '1p': '-āmus',
        '2p': '-ātis',
        '3p': '-ant',
      },
      imperfectum: {
        '1s': '-ābam',
        '2s': '-ābās',
        '3s': '-ābat',
        '1p': '-ābāmus',
        '2p': '-ābātis',
        '3p': '-ābant',
      },
      perfectum: perfectumUitgangen,
      plusquamperfectum: plusquamperfectumUitgangen,
    },
    vormen: {
      praesens: {
        '1s': 'amō',
        '2s': 'amās',
        '3s': 'amat',
        '1p': 'amāmus',
        '2p': 'amātis',
        '3p': 'amant',
      },
      imperfectum: {
        '1s': 'amābam',
        '2s': 'amābās',
        '3s': 'amābat',
        '1p': 'amābāmus',
        '2p': 'amābātis',
        '3p': 'amābant',
      },
      perfectum: {
        '1s': 'amāvī',
        '2s': 'amāvistī',
        '3s': 'amāvit',
        '1p': 'amāvimus',
        '2p': 'amāvistis',
        '3p': 'amāvērunt',
      },
      plusquamperfectum: {
        '1s': 'amāveram',
        '2s': 'amāverās',
        '3s': 'amāverat',
        '1p': 'amāverāmus',
        '2p': 'amāverātis',
        '3p': 'amāverant',
      },
    },
  },
  {
    id: 'conj-2',
    naam: '2e Conjugatie',
    beschrijving: 'Werkwoorden op -ēre',
    kenmerk: '-ē- stam',
    voorbeeldwoord: 'monēre',
    betekenis: 'waarschuwen, vermanen',
    stammen: {
      praesens: 'monē-',
      perfectum: 'monu-',
    },
    uitgangen: {
      praesens: {
        '1s': '-eō',
        '2s': '-ēs',
        '3s': '-et',
        '1p': '-ēmus',
        '2p': '-ētis',
        '3p': '-ent',
      },
      imperfectum: {
        '1s': '-ēbam',
        '2s': '-ēbās',
        '3s': '-ēbat',
        '1p': '-ēbāmus',
        '2p': '-ēbātis',
        '3p': '-ēbant',
      },
      perfectum: perfectumUitgangen,
      plusquamperfectum: plusquamperfectumUitgangen,
    },
    vormen: {
      praesens: {
        '1s': 'moneō',
        '2s': 'monēs',
        '3s': 'monet',
        '1p': 'monēmus',
        '2p': 'monētis',
        '3p': 'monent',
      },
      imperfectum: {
        '1s': 'monēbam',
        '2s': 'monēbās',
        '3s': 'monēbat',
        '1p': 'monēbāmus',
        '2p': 'monēbātis',
        '3p': 'monēbant',
      },
      perfectum: {
        '1s': 'monuī',
        '2s': 'monuistī',
        '3s': 'monuit',
        '1p': 'monuimus',
        '2p': 'monuistis',
        '3p': 'monuērunt',
      },
      plusquamperfectum: {
        '1s': 'monueram',
        '2s': 'monuerās',
        '3s': 'monuerat',
        '1p': 'monuerāmus',
        '2p': 'monuerātis',
        '3p': 'monuerant',
      },
    },
  },
  {
    id: 'conj-3',
    naam: '3e Conjugatie',
    beschrijving: 'Werkwoorden op -ere',
    kenmerk: 'consonantstam',
    voorbeeldwoord: 'legere',
    betekenis: 'lezen, verzamelen',
    stammen: {
      praesens: 'leg-',
      perfectum: 'lēg-',
    },
    uitgangen: {
      praesens: {
        '1s': '-ō',
        '2s': '-is',
        '3s': '-it',
        '1p': '-imus',
        '2p': '-itis',
        '3p': '-unt',
      },
      imperfectum: {
        '1s': '-ēbam',
        '2s': '-ēbās',
        '3s': '-ēbat',
        '1p': '-ēbāmus',
        '2p': '-ēbātis',
        '3p': '-ēbant',
      },
      perfectum: perfectumUitgangen,
      plusquamperfectum: plusquamperfectumUitgangen,
    },
    vormen: {
      praesens: {
        '1s': 'legō',
        '2s': 'legis',
        '3s': 'legit',
        '1p': 'legimus',
        '2p': 'legitis',
        '3p': 'legunt',
      },
      imperfectum: {
        '1s': 'legēbam',
        '2s': 'legēbās',
        '3s': 'legēbat',
        '1p': 'legēbāmus',
        '2p': 'legēbātis',
        '3p': 'legēbant',
      },
      perfectum: {
        '1s': 'lēgī',
        '2s': 'lēgistī',
        '3s': 'lēgit',
        '1p': 'lēgimus',
        '2p': 'lēgistis',
        '3p': 'lēgērunt',
      },
      plusquamperfectum: {
        '1s': 'lēgeram',
        '2s': 'lēgerās',
        '3s': 'lēgerat',
        '1p': 'lēgerāmus',
        '2p': 'lēgerātis',
        '3p': 'lēgerant',
      },
    },
  },
  {
    id: 'conj-4',
    naam: '4e Conjugatie',
    beschrijving: 'Werkwoorden op -īre',
    kenmerk: '-ī- stam',
    voorbeeldwoord: 'audīre',
    betekenis: 'horen, luisteren',
    stammen: {
      praesens: 'audī-',
      perfectum: 'audīv-',
    },
    uitgangen: {
      praesens: {
        '1s': '-iō',
        '2s': '-īs',
        '3s': '-it',
        '1p': '-īmus',
        '2p': '-ītis',
        '3p': '-iunt',
      },
      imperfectum: {
        '1s': '-iēbam',
        '2s': '-iēbās',
        '3s': '-iēbat',
        '1p': '-iēbāmus',
        '2p': '-iēbātis',
        '3p': '-iēbant',
      },
      perfectum: perfectumUitgangen,
      plusquamperfectum: plusquamperfectumUitgangen,
    },
    vormen: {
      praesens: {
        '1s': 'audiō',
        '2s': 'audīs',
        '3s': 'audit',
        '1p': 'audīmus',
        '2p': 'audītis',
        '3p': 'audiunt',
      },
      imperfectum: {
        '1s': 'audiēbam',
        '2s': 'audiēbās',
        '3s': 'audiēbat',
        '1p': 'audiēbāmus',
        '2p': 'audiēbātis',
        '3p': 'audiēbant',
      },
      perfectum: {
        '1s': 'audīvī',
        '2s': 'audīvistī',
        '3s': 'audīvit',
        '1p': 'audīvimus',
        '2p': 'audīvistis',
        '3p': 'audīvērunt',
      },
      plusquamperfectum: {
        '1s': 'audīveram',
        '2s': 'audīverās',
        '3s': 'audīverat',
        '1p': 'audīverāmus',
        '2p': 'audīverātis',
        '3p': 'audīverant',
      },
    },
  },
];

// Extra oefenwerkwoorden per conjugatie
export interface PracticeVerb {
  infinitivus: string;
  stam: string;
  perfectumStam: string;
  betekenis: string;
  conjugatieId: string;
}

export const practiceVerbs: PracticeVerb[] = [
  // 1e conjugatie
  { infinitivus: 'vocāre', stam: 'vocā-', perfectumStam: 'vocāv-', betekenis: 'roepen', conjugatieId: 'conj-1' },
  { infinitivus: 'portāre', stam: 'portā-', perfectumStam: 'portāv-', betekenis: 'dragen', conjugatieId: 'conj-1' },
  { infinitivus: 'labōrāre', stam: 'labōrā-', perfectumStam: 'labōrāv-', betekenis: 'werken', conjugatieId: 'conj-1' },
  { infinitivus: 'spectāre', stam: 'spectā-', perfectumStam: 'spectāv-', betekenis: 'bekijken', conjugatieId: 'conj-1' },
  { infinitivus: 'nārrāre', stam: 'nārrā-', perfectumStam: 'nārrāv-', betekenis: 'vertellen', conjugatieId: 'conj-1' },

  // 2e conjugatie
  { infinitivus: 'vidēre', stam: 'vidē-', perfectumStam: 'vīd-', betekenis: 'zien', conjugatieId: 'conj-2' },
  { infinitivus: 'habēre', stam: 'habē-', perfectumStam: 'habu-', betekenis: 'hebben', conjugatieId: 'conj-2' },
  { infinitivus: 'timēre', stam: 'timē-', perfectumStam: 'timu-', betekenis: 'vrezen', conjugatieId: 'conj-2' },
  { infinitivus: 'docēre', stam: 'docē-', perfectumStam: 'docu-', betekenis: 'onderwijzen', conjugatieId: 'conj-2' },
  { infinitivus: 'tenēre', stam: 'tenē-', perfectumStam: 'tenu-', betekenis: 'houden', conjugatieId: 'conj-2' },

  // 3e conjugatie
  { infinitivus: 'dūcere', stam: 'dūc-', perfectumStam: 'dūx-', betekenis: 'leiden', conjugatieId: 'conj-3' },
  { infinitivus: 'scribere', stam: 'scrib-', perfectumStam: 'scrīps-', betekenis: 'schrijven', conjugatieId: 'conj-3' },
  { infinitivus: 'mittere', stam: 'mitt-', perfectumStam: 'mīs-', betekenis: 'zenden', conjugatieId: 'conj-3' },
  { infinitivus: 'vincere', stam: 'vinc-', perfectumStam: 'vīc-', betekenis: 'overwinnen', conjugatieId: 'conj-3' },
  { infinitivus: 'currere', stam: 'curr-', perfectumStam: 'cucurr-', betekenis: 'rennen', conjugatieId: 'conj-3' },

  // 4e conjugatie
  { infinitivus: 'venīre', stam: 'venī-', perfectumStam: 'vēn-', betekenis: 'komen', conjugatieId: 'conj-4' },
  { infinitivus: 'dormīre', stam: 'dormī-', perfectumStam: 'dormīv-', betekenis: 'slapen', conjugatieId: 'conj-4' },
  { infinitivus: 'sentīre', stam: 'sentī-', perfectumStam: 'sēns-', betekenis: 'voelen', conjugatieId: 'conj-4' },
  { infinitivus: 'scīre', stam: 'scī-', perfectumStam: 'scīv-', betekenis: 'weten', conjugatieId: 'conj-4' },
  { infinitivus: 'aperīre', stam: 'aperī-', perfectumStam: 'aperu-', betekenis: 'openen', conjugatieId: 'conj-4' },
];
