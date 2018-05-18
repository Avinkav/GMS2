import { Component, OnInit, ViewChild } from '@angular/core';
import * as $ from 'jquery';
import 'fullcalendar';
import { MockdataService } from '../services/mockdata.service';
import { Teacher } from '../models/teacher';

@Component({
  selector: 'app-book-lesson',
  templateUrl: './book-lesson.component.html',
  styleUrls: ['./book-lesson.component.scss']
})
export class BookLessonComponent implements OnInit {

  teachers: Teacher[];
  @ViewChild('stepper') stepper;
  step1: boolean;
  step2: boolean;
  step3: boolean;
  step4: boolean;
  events;

  selectedTeacher: Teacher;
  selectedDate: Date;

  constructor(private mockDataService: MockdataService) { }


  ngOnInit() {
    this.mockDataService.getTeachers().subscribe(t => this.teachers = t);
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

  clickTeacher(t: Teacher) {
    this.selectedTeacher = t;
    this.step1 = true;
  }

}
