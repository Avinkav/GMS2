import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-finances',
  templateUrl: './finances.component.html',
  styleUrls: ['./finances.component.css']
})
export class FinancesComponent implements OnInit {

  summary = [
    { date: '19/05/2018', reference: 4384, user: 'n/a', type: 'Credit', description: 'Lesson', amount: 80, balance: 3214 },
    { date: '8/05/2018', reference: 4385, user: 'n/a', type: 'Credit', description: 'Lesson', amount: 80, balance: 3294 },
    { date: '1/05/2018', reference: 4386, user: 'n/a', type: 'Debit', description: 'Wages', amount: 250, balance: 3044 },
    { date: '35/04/2018', reference: 4387, user: 'n/a', type: 'Credit', description: 'Instrument Sale', amount: 650, balance: 3694 },
  ];

  type = 'line';
  data = {
    labels: ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'],
    datasets: [
      {
        label: 'Weekly Summary',
        data: [3125, 3044, 3694, 3294, 3564, 3742, 3545]
      }
    ]
  };
  options = {
    responsive: true,
    maintainAspectRatio: false
  };

  constructor() { }

  ngOnInit() {
  }

}
