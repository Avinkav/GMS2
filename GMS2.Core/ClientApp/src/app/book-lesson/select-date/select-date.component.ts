import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { Teacher } from '../../models/teacher';

@Component({
  selector: 'app-select-date',
  templateUrl: './select-date.component.html',
  styleUrls: ['./select-date.component.css']
})
export class SelectDateComponent implements OnInit {

  view = 'month';
  selectedDate: Date = new Date();
  events: CalendarEvent[] = [];
  @Output() selectDate = new EventEmitter<Date>();
  @Output() selectDuration = new EventEmitter<number>();

  @Input() model: Teacher;


  constructor() { }

  ngOnInit() {
  }

  durationSelected(value) {
    this.selectDuration.emit(value);
  }

}
