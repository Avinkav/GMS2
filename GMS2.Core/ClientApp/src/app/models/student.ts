import { Lesson } from './lesson';

export class Student {
    id: string;
    userId: string;
    lessonsTaken: Lesson[];
    instruments: string[];
};
