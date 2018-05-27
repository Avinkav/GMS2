import { Component, OnInit, ViewChild } from '@angular/core';
import * as $ from 'jquery';
import 'fullcalendar';
import { MockdataService } from '../services/mockdata.service';
import { Teacher } from '../models/teacher';
import { CalendarEvent } from 'calendar-utils';
import { Lesson } from '../models/lesson';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

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


  constructor(private dataService: DataService, private userService: UserService, private router: Router) { }

  ngOnInit() {
    const user = this.userService.getCurrentLogin();
    if (!user) {
      this.router.navigateByUrl('/login');
    }

    this.dataService.getTeachers().subscribe(obj => {
      this.teachers = obj;
    },
      error => console.log(error)
    );
    this.model.student = user.student;
    this.model.duration = 30;
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

  cancelClick(e) {

  }

  confirmClick(e) {
    this.dataService.newLesson(this.model).subscribe(
      res => { if (res.ok) {
        this.router.navigateByUrl('/user-portal/lessons');
      }
    },
    err => console.log(err)
    );
  }

}
