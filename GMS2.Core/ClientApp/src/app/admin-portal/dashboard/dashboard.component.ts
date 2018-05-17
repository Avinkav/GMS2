import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import 'fullcalendar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  summary = [
    { user: 'n/a', type: 'Credit', description: 'Lesson', amount: 80 },
    { user: 'n/a', type: 'Credit', description: 'Lesson', amount: 60 },
    { user: 'n/a', type: 'Debit', description: 'Wage', amount: 250 },
    { user: 'n/a', type: 'Credit', description: 'Instrument Sale', amount: 650 },
  ]

  constructor() { }

  ngOnInit() {
    $('#calendar').fullCalendar({
      eventLimit: false,
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      },
      // events: this.events,
      // eventClick: this.eventClick
    });
  }

}
