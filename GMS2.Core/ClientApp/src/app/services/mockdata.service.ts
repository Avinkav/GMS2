import { Injectable } from '@angular/core';
import { Instrument, instruments, borrowedInstruments } from '../models/instrument';
import { Observable, of } from 'rxjs';
import { Teacher, teachers } from '../models/teacher';


@Injectable({
  providedIn: 'root'
})
export class MockdataService {

  constructor() { }

  getBorrowedInstruments(): Observable<Instrument[]> {
    return of(borrowedInstruments);
  }

  getInstruments(): Observable<Instrument[]> {
    return of(shuffle(instruments));
  }

  getTeachers(): Observable<Teacher[]> {
    return of(teachers);
  }

  getEvents() {
    return of([
      {
        title: 'Piano with Mozart',
        start: '2018-05-15',
        color: '#F44336'
      },
      {
        title: 'Opera with Luciano Pavarotti ',
        start: '2018-05-20',
        color: '#FFC107'
      },
      {
        title: 'CDJs with Skrillex ',
        start: '2018-05-31',
        color: '#4CAF50'
      },
    ]);
  }

  getFreeSlots() {
    return of([
      {
        title: 'Booked',
        start: '2018-05-13T09:00:00+10:00',
        end: '2018-05-13T16:00:00+10:00',
        color: '#F44336'
      },
      {
        title: 'Free',
        start: '2018-05-15T11:00:00+10:00',
        end: '2018-05-15T14:00:00+10:00',
        color: '#4CAF50',
      },
      {
        title: 'Free',
        start: '2018-05-25T16:00:00+10:00',
        end: '2018-05-25T20:00:00+10:00',
        color: '#FFC107',
      },
    ]);
  }


  getPayments() {
    return of([{
      id: 1,
      date: '15-Apr-2018',
      payee: 'Dr. Hugo Strange',
      status: 'Overdue',
      amount: 50,
      description: 'You took Violin classes'
    },
    {
      id: 2,
      date: '05-Apr-2018',
      payee: 'Dr. Albert Einstein',
      status: 'Paid',
      amount: 299792.458,
      description: 'You took General Music Thoery of Relativity classes'
    },
    {
      id: 3,
      date: '18-Mar-2018',
      payee: 'Mario Luigi',
      status: 'Paid',
      amount: 322.00,
      description: 'You took banjo classes'
    },
    ]);
  }
}

function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
