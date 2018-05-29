import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import 'fullcalendar';
import { Teacher } from '../../models/teacher';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.css']
})
export class TeacherDashboardComponent implements OnInit {

  summary = [
    { date: '24/04/2018', hours: 25, amount: 2000 },
    { date: '08/05/2018', hours: 31, amount: 2450.70 },
    { date: '22/05/2018', hours: 23, amount: 1840 },
    { date: '05/06/2018', hours: 28, amount: 2214.88 },
    { date: '19/06/2018', hours: 27, amount: 2136.9 },
  ]

  readonly model: Teacher;
  constructor(private userService: UserService) {
    let user = this.userService.getCurrentLogin();
    if (user)
      this.model = user.teacher;
  }

  ngOnInit() {
    
  }

}
