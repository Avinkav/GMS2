import { Component, OnInit, ViewChild } from '@angular/core';
import * as $ from 'jquery';
import 'fullcalendar';
import { MockdataService } from '../services/mockdata.service';
import { Teacher } from '../models/teacher';
import { CalendarEvent } from 'calendar-utils';
import { Lesson } from '../models/lesson';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-book-lesson',
  templateUrl: './book-lesson.component.html',
  styleUrls: ['./book-lesson.component.scss']
})
export class BookLessonComponent implements OnInit {


  teachers: Teacher[];
  @ViewChild('stepper') stepper;
  step1 = false;
  step2 = false;
  step3 = false;
  step4 = false;

  model: Lesson = new Lesson();


  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getTeachers().subscribe(obj => {
      this.teachers = obj;
    },
      error => console.log(error)
    );
  }

  teacherSelected(t) {
    this.model.teacher = t;
    this.step1 = true;
    this.stepper.next();
  }

  dateSelected(d) {
    this.model.date = d;
    this.step2 = true;
    this.stepper.next();
  }

}
