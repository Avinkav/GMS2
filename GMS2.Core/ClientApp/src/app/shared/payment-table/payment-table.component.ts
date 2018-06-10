import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment-table',
  templateUrl: './payment-table.component.html',
  styleUrls: ['./payment-table.component.css']
})
export class PaymentTableComponent implements OnInit {

  bills = [{
    id: 1,
    date: '15 Apr',
    payee: 'Dr. Hugo Strange',
    status: 'Overdue',
    amount: 50,
    description: 'You took Violin classes'
  },
  {
    id: 2,
    date: '05 Apr',
    payee: 'Dr. Albert Einstein',
    status: 'Paid',
    amount: 299792.458,
    description: 'You took General Music Thoery of Relativity classes'
  },
  {
    id: 3,
    date: '18 Mar',
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
