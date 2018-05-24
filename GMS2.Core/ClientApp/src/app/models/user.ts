import { Teacher } from "./teacher";
import { Student } from "./student";

export class User {
    id: string;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    addressLine1: string;
    city: string;
    state: string;
    postCode: number;
    phoneNumber: string;
    dob: string;
    password: string;
    teacher: Teacher;
    student: Student;
    roles: string[];
}


export const STATES = ['QLD', 'NSW', 'WA', 'NT', 'TAS'];
