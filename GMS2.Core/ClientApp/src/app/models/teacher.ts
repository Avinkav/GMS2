import { Instrument } from './instrument';

export class Teacher {
    // id: string;
    name: string;
    instruments: string[];
}

export const teachers: Teacher[] = [{
    name: 'Luciano Pavarotti',
    instruments: ['Opera', 'Theatre']
  },
  {
    name: 'Wolfgang Mozart',
    instruments: ['Violin', 'Ochestra']
  },
  {
    name: 'Skrillex',
    instruments: ['Vinyl', 'CDJs']
  },
  {
    name: 'Adele',
    instruments: ['Pop', 'Rap']
  },
];
