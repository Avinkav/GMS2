import { Instrument } from './instrument';

export class Teacher {
    // id: string;
    name: string;
    instruments: string[];
    description: string;
    selected: boolean;
}

export const teachers: Teacher[] = [{
    name: 'Luciano Pavarotti',
    description: `Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio,
    vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla.
    Donec lacinia congue felis in faucibus.`,
    instruments: ['Opera', 'Theatre'],
    selected: false
  },
  {
    name: 'Wolfgang Mozart',
    description: `Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio,
    vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla.
    Donec lacinia congue felis in faucibus.`,
    instruments: ['Violin', 'Ochestra'],
    selected: false
  },
  {
    name: 'Skrillex',
    description: `Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio,
    vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla.
    Donec lacinia congue felis in faucibus.`,
    instruments: ['Vinyl', 'CDJs'],
    selected: false
  },
  {
    name: 'Adele',
    description: `Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio,
    vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla.
    Donec lacinia congue felis in faucibus.`,
    instruments: ['Pop', 'Rap'],
    selected: false
  },
];
