import { Component, OnInit } from '@angular/core';
import { CalendarEvent } from 'calendar-utils';
import { DataService } from '../../services/data.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { Lesson } from '../../models/lesson';
import { duration } from 'moment';
import * as $ from 'jquery';
import { jsonpCallbackContext } from '@angular/common/http';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {


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


  lessons: Lesson[];
  readonly model: User;

  constructor(private dataService: DataService, private router: Router, private userService: UserService) {
    this.model = this.userService.getCurrentLogin();

    if (!this.model) {
      router.navigateByUrl('/login');
    }
  }

  ngOnInit() {
    // tslint:disable-next-line:quotemark
    for (let j = 1; j <= 5; j++) {
      $('.star-' + j).hover(
        () => {
          for (let i = 1; i <= j; i++) {
            $('.star-' + i).addClass('star');
          }
        },
        () => {
          for (let i = 1; i <= j; i++) {
            $('.star-' + i).removeClass('star');
          }
        });
    }

    for (let j = 1; j <= 5; j++) {
      $('.star-' + j).click(
        () => {
          $(`[class^='star-']`).removeClass(['starred', 'star']);
          for (let i = 1; i <= j; i++)
            $('.star-' + i).addClass('starred');
        }
      );
    }
  }
}
