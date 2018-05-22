import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css']
})
export class IncomeComponent implements OnInit {

  constructor() { }
  summary = [
    { fortnight_end: '24/04/2018', paydate: '23/04/2018', employee_no: '00123', rate: 80, hours: 25, value: 2000, deductions:0, total: 2000 },
    { fortnight_end: '08/05/2018', paydate: '07/05/2018', employee_no: '00123', rate: 80, hours: 31, value: 2480, deductions:29.30, total: 2450.7 },
    { fortnight_end: '22/05/2018', paydate: '21/05/2018', employee_no: '00123', rate: 80, hours: 23, value: 1840, deductions:0, total: 1840 },
    { fortnight_end: '05/06/2018', paydate: '14/06/2018', employee_no: '00123', rate: 80, hours: 28, value: 2240, deductions:25.12, total: 2214.88 },
    { fortnight_end: '19/06/2018', paydate: '18/06/2018', employee_no: '00123', rate: 80, hours: 27, value: 2160, deductions:23.1, total: 2136.9},
  ];
  ngOnInit() {
  }

}
