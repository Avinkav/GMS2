import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.css']
})
export class LessonsComponent implements OnInit {

  viewDate = new Date();
  readonly model;

  constructor(private userService: UserService) {
  this.model = this.userService.getCurrentLogin().student;
  }

  ngOnInit() {
  }

}
