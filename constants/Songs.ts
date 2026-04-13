export interface Song {
  id: string;
  title: string;
  artist: string;
  cover: any; // Using any to support both URLs and require()
}

export const SONGS: Song[] = [
  {
    id: '1',
    title: 'Ikaw ng Pag-asa',
    artist: 'Adelene Rabulan',
    cover: require('../assets/cover/ikaw_pag_asa.jpg'),
  },
  {
    id: '2',
    title: 'Magwawagi',
    artist: 'KDR Music House',
    cover: require('../assets/cover/magwawagi.jpg'),
  },
  {
    id: '3',
    title: 'Alam Niya',
    artist: 'The Juans',
    cover: require('../assets/cover/alam_niya.jpg'),
  },
  {
    id: '4',
    title: 'Kahit sa isang sulok lang',
    artist: 'Hakki Patricio',
    cover: require('../assets/cover/sulok_lang.jpg'),
  },
  {
    id: '5',
    title: 'Kneel down and pray',
    artist: 'Shari Go',
    cover: require('../assets/cover/kneel_pray.jpg'),
  },
];
