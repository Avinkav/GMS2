import { Component, OnInit } from '@angular/core';
import { CalendarEvent } from 'calendar-utils';
import { DataService } from '../../services/data.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { Lesson } from '../../models/lesson';
import { duration } from 'moment';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  viewDate = new Date();
  bills = [{
    id: 1,
    date: '15-Apr-2018',
    payee: 'Dr. Hugo Strange',
    status: 'Overdue',
    amount: 50,
    description: 'You took Violin classes'
  },
  {
    id: 2,
    date: '05-Apr-2018',
    payee: 'Dr. Albert Einstein',
    status: 'Paid',
    amount: 299792.458,
    description: 'You took General Music Thoery of Relativity classes'
  },
  {
    id: 3,
    date: '18-Mar-2018',
    payee: 'Mario Luigi',
    status: 'Paid',
    amount: 322.00,
    description: 'You took banjo classes'
  },
];

  events: CalendarEvent[];
  lessons: Lesson[];
  readonly user: User;

  constructor(private dataService: DataService, private router: Router, private userService: UserService) {
    this.user = this.userService.getCurrentLogin();

    if (!this.user) {
      router.navigateByUrl('/login');
    }
   }

  ngOnInit() {
    this.dataService.getLessons(this.user.student.id).subscribe(
      res => {
      this.lessons = res;
      this.events = this.lessons.map( l => {console.log(l); return ({
        start: new Date(l.date),
        end:  this.getEndDate(new Date(l.date), l.duration),
        title: 'Class with ' + l.teacher.name
      });
    });
      }
    );
  }

   getEndDate(date: Date, dur: number) {
    return new Date(date.getTime() + dur * 60000);
   }
}
