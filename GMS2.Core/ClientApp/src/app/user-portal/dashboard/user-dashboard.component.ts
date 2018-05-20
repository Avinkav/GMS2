import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  viewDate = new Date();
  bills = [{
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
];
  constructor() { }

  ngOnInit() {
  }

}
