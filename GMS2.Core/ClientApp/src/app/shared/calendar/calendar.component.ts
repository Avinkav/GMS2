import { Component, OnInit, Input } from '@angular/core';
import { CalendarEvent } from 'calendar-utils';
import { DataService } from '../../services/data.service';
import { Teacher } from '../../models/teacher';
import { Student, isStudent } from '../../models/student';
import { Lesson } from '../../models/lesson';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  viewDate = new Date();
  events: CalendarEvent[];
  activeDayIsOpen = false;

  @Input() view = 'month';
  @Input() model: Teacher | Student;
  @Input() admin = false;
  @Input() navbar = true;
  @Input() viewbar = ['month', 'week', 'day', 'list'];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    if (this.admin) {
      this.dataService.getAllLessons().subscribe(
        res => { console.log(res); this.events = this.mapToEvents(res); return; },
        err => { }
      );
    }
    if (!this.model)
      return;
    this.dataService.getLessons(this.model).subscribe(
      res => {
        console.log(res);
        this.events = this.mapToEvents(res);
      });
  }

  getEndDate(date: Date, dur: number) {
    return new Date(date.getTime() + dur * 60000);
  }

  mapToEvents(lessons: Lesson[]) {
    return lessons.map(l => {
      let title;
      if (this.admin)
        title = l.teacher.name + ' teaching ' + l.student.name;
      else
        title = isStudent(this.model) ? l.teacher.name : l.student.name;
      return {
        start: new Date(l.date),
        end: this.getEndDate(new Date(l.date), l.duration),
        title: title
      };
    }
    );
  }

}
