export class Instrument {
    id: number;
    name: string;
    hireCost: number;
    isLate: boolean;
    imageUrl: string;
}

export const burrowedInstruments: Instrument[] = [
    {id: 1, name: 'Marshall Electric Guitar', hireCost: 10, isLate: true,
    imageUrl: 'assets/instruments/2000.jpg' },
    {id: 3, name: 'Stunning Violin', hireCost: 10, isLate: false,
    imageUrl: 'assets/instruments/Violin.jpg'},
];

export const instruments: Instrument[] = [
    {id: 1, name: 'Marshall Electric Guitar', hireCost: 10, isLate: true,
    imageUrl: 'assets/instruments/2000.jpg' },
    {id: 2, name: 'Grand Piano', hireCost: 20, isLate: false,
    imageUrl: 'assets/instruments/piano.jpg' },
    {id: 3, name: 'Electric Violin', hireCost: 10, isLate: false,
    imageUrl: 'assets/instruments/25579.jpg'},
];
