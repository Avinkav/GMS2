import { Teacher } from './teacher';
import { Student } from './student';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

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


export const STATES = ['New South Wales (NSW)', 'Queensland (QLD)', 'South Australia (SA)', 'Tasmania (TAS)', 'Western Australia (WA)', 'Victoria (VIC)', 'Northern Territory (NT)', 'Australian Capital Territory (ACT)'];


export const stateSearch = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => STATES.filter(v => v.toLowerCase().includes(term.toLowerCase())))
    )
