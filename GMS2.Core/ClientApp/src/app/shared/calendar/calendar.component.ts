import { Component, OnInit, Input } from '@angular/core';
import { CalendarEvent } from 'calendar-utils';
import { DataService } from '../../services/data.service';
import { Teacher } from '../../models/teacher';
import { Student, isStudent } from '../../models/student';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  view = 'month';
  viewDate = new Date();
  events: CalendarEvent[];
  activeDayIsOpen = false;
  
  @Input() model: Teacher | Student;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    if (!this.model)
      return;
    this.dataService.getLessons(this.model).subscribe(
      res => {
        console.log(res);
        this.events = res.map(l => ({
            start: new Date(l.date),
            end: this.getEndDate(new Date(l.date), l.duration),
            title: isStudent(this.model) ? l.teacher.name : l.student.name
          })
        );
      });
  }

  getEndDate(date: Date, dur: number) {
    return new Date(date.getTime() + dur * 60000);
  }

}
