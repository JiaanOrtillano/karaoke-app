export interface LyricWord {
  text: string;
  time: number; // Offset from line start in ms
  duration: number; // Duration of word in ms
}

export interface LyricLine {
  time: number; // Start time of line in ms
  text: string; // Full text for fallback
  words: LyricWord[];
  pitchData: number[]; // Granular pitch values for the scrolling timeline
}

const IKAW_NG_PAG_ASA: LyricLine[] = [
  { 
    time: 0, 
    text: "Sa pagdating ng unos ng hangin at ulan", 
    words: [
      { text: "Sa", time: 0, duration: 200 },
      { text: "pagdating", time: 300, duration: 400 },
      { text: "ng", time: 800, duration: 200 },
      { text: "unos", time: 1100, duration: 400 },
      { text: "ng", time: 1600, duration: 200 },
      { text: "hangin", time: 1900, duration: 400 },
      { text: "at", time: 2400, duration: 200 },
      { text: "ulan", time: 2700, duration: 600 },
    ],
    pitchData: [60, 62, 64, 62, 60, 62, 58, 60]
  },
  { 
    time: 5000, 
    text: "Tanging pangalan mo, Ama, ang tinatawagan", 
    words: [
      { text: "Tanging", time: 0, duration: 400 },
      { text: "pangalan", time: 500, duration: 500 },
      { text: "mo,", time: 1100, duration: 300 },
      { text: "Ama,", time: 1500, duration: 400 },
      { text: "ang", time: 2000, duration: 200 },
      { text: "tinatawagan", time: 2300, duration: 700 },
    ],
    pitchData: [62, 64, 66, 65, 63, 62]
  }
];

const MAGWAWAGI: LyricLine[] = [
  { 
    time: 0, 
    text: "Bawat isa'y may pinagdaraanan", 
    words: [
      { text: "Bawat", time: 0, duration: 300 },
      { text: "isa'y", time: 400, duration: 300 },
      { text: "may", time: 800, duration: 200 },
      { text: "pinagdaraanan", time: 1100, duration: 800 },
    ],
    pitchData: [60, 60, 62, 64]
  },
  { 
    time: 4000, 
    text: "May mga hirap, mga kalungkutan", 
    words: [
      { text: "May", time: 0, duration: 200 },
      { text: "mga", time: 300, duration: 200 },
      { text: "hirap,", time: 600, duration: 400 },
      { text: "mga", time: 1100, duration: 200 },
      { text: "kalungkutan", time: 1400, duration: 800 },
    ],
    pitchData: [58, 60, 62, 60, 58]
  },
  { 
    time: 8000, 
    text: "Kami'y magwawagi kung iyong sasamahan", 
    words: [
      { text: "Kami'y", time: 0, duration: 400 },
      { text: "magwawagi", time: 500, duration: 600 },
      { text: "kung", time: 1200, duration: 200 },
      { text: "iyong", time: 1500, duration: 400 },
      { text: "sasamahan", time: 2000, duration: 700 },
    ],
    pitchData: [64, 66, 64, 62, 64]
  }
];

const ALAM_NIYA: LyricLine[] = [
  { 
    time: 0, 
    text: "Kung sa puso mo ay 'di maiwasan", 
    words: [
      { text: "Kung", time: 0, duration: 200 },
      { text: "sa", time: 300, duration: 200 },
      { text: "puso", time: 600, duration: 400 },
      { text: "mo", time: 1100, duration: 200 },
      { text: "ay", time: 1400, duration: 200 },
      { text: "'di", time: 1700, duration: 200 },
      { text: "maiwasan", time: 2000, duration: 600 },
    ],
    pitchData: [60, 60, 62, 60, 58, 60, 62]
  },
  { 
    time: 5000, 
    text: "Ang pagdalaw nitong mga kalungkutan", 
    words: [
      { text: "Ang", time: 0, duration: 200 },
      { text: "pagdalaw", time: 300, duration: 500 },
      { text: "nitong", time: 900, duration: 300 },
      { text: "mga", time: 1300, duration: 200 },
      { text: "kalungkutan", time: 1600, duration: 700 },
    ],
    pitchData: [62, 64, 62, 60, 58]
  }
];

const KAHIT_SA_SULOK: LyricLine[] = [
  { 
    time: 0, 
    text: "Hindi ako karapat-dapat ibigin", 
    words: [
      { text: "Hindi", time: 0, duration: 300 },
      { text: "ako", time: 400, duration: 300 },
      { text: "karapat-dapat", time: 800, duration: 600 },
      { text: "ibigin", time: 1500, duration: 500 },
    ],
    pitchData: [55, 57, 55, 53]
  },
  { 
    time: 5000, 
    text: "Kahit sa isang sulok ng 'yong paraiso", 
    words: [
      { text: "Kahit", time: 0, duration: 400 },
      { text: "sa", time: 500, duration: 200 },
      { text: "isang", time: 800, duration: 400 },
      { text: "sulok", time: 1300, duration: 400 },
      { text: "ng", time: 1800, duration: 200 },
      { text: "'yong", time: 2100, duration: 300 },
      { text: "paraiso", time: 2500, duration: 600 },
    ],
    pitchData: [60, 62, 64, 66, 64, 62, 60]
  }
];

const KNEEL_DOWN_AND_PRAY: LyricLine[] = [
  { 
    time: 0, 
    text: "When you're feeling so low and tears overflow", 
    words: [
      { text: "When", time: 0, duration: 200 },
      { text: "you're", time: 300, duration: 200 },
      { text: "feeling", time: 600, duration: 400 },
      { text: "so", time: 1100, duration: 200 },
      { text: "low", time: 1400, duration: 400 },
      { text: "and", time: 1900, duration: 200 },
      { text: "tears", time: 2200, duration: 400 },
      { text: "overflow", time: 2700, duration: 600 },
    ],
    pitchData: [60, 62, 60, 64, 60, 62, 64, 62]
  },
  { 
    time: 5000, 
    text: "Kneel down and pray, cause He's always there", 
    words: [
      { text: "Kneel", time: 0, duration: 300 },
      { text: "down", time: 400, duration: 300 },
      { text: "and", time: 800, duration: 200 },
      { text: "pray,", time: 1100, duration: 400 },
      { text: "cause", time: 1600, duration: 200 },
      { text: "He's", time: 1900, duration: 200 },
      { text: "always", time: 2200, duration: 400 },
      { text: "there", time: 2700, duration: 500 },
    ],
    pitchData: [65, 67, 65, 63, 62, 60, 62, 64]
  }
];

export const LYRICS_MAP: Record<string, LyricLine[]> = {
  '1': IKAW_NG_PAG_ASA,
  '2': MAGWAWAGI,
  '3': ALAM_NIYA,
  '4': KAHIT_SA_SULOK,
  '5': KNEEL_DOWN_AND_PRAY,
};

// Keep STAY_LYRICS for backward compatibility if needed, 
// but we'll use LYRICS_MAP in the player
export const STAY_LYRICS = IKAW_NG_PAG_ASA;
