import { Teacher } from "./teacher";
import { Student } from "./student";

export class Lesson {
    teacher: Teacher;
    student: Student;
    date: Date;
    duration: number;
    cost: number;
    lessonType: string;
}
