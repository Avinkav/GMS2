import { Lesson } from './lesson';
import { Teacher } from './teacher';

export class Student {
    id: string;
    userId: string;
    name: string;
    lessonsTaken: Lesson[];
    instruments: string[];
}


export function isStudent(model: Student | Teacher) {
    return (<Student>model).lessonsTaken !== undefined;
}
