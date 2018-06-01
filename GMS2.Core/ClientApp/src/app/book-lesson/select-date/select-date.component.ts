import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { Teacher } from '../../models/teacher';
import { subDays, compareAsc } from 'date-fns';
import { shrinkInOut } from '../../animations/shrinkInOut';
import * as $ from 'jquery';

@Component({
  selector: 'app-select-date',
  templateUrl: './select-date.component.html',
  styleUrls: ['./select-date.component.scss'],
  animations: [shrinkInOut]
})
export class SelectDateComponent implements OnInit {

  view = 'month';
  selectedDate: Date = new Date();
  events: CalendarEvent[] = [];
  error = '';
  @Output() selectDate = new EventEmitter<Date>();
  @Output() selectDuration = new EventEmitter<number>();

  @Input() model: Teacher;


  constructor() { }

  ngOnInit() {
  }

  clickDate(date: Date) {
    if (compareAsc(date, new Date()) < 1) {
      this.error = 'Pick a date in the future';
      return;
    }

    this.error = '';
    this.selectedDate = date;
    this.view = 'day';
  }

  durationSelected(value) {
    this.selectDuration.emit(value);
  }

  hourClicked($event) {
    this.selectedDate = $event.date;
    this.selectDate.emit($event.date);
  }
}
