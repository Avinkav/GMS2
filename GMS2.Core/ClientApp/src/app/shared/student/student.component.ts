import { Component, OnInit, Input } from '@angular/core';
import { Student } from '../../models/student';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { UserService } from '../../services/user.service';
import { shrinkInOut } from '../../animations/shrinkInOut';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
  animations: [shrinkInOut]
})
export class StudentComponent implements OnInit {

  @Input() model: Student;
  @Input() admin = false;
  @Input() permission;
  @Input() userId;
  value = '';

  constructor(private userService: UserService, private dataService: DataService) { }

  ngOnInit() {

  }

  removeItem(value: string) {
    this.model.instruments.splice(this.model.instruments.indexOf(value), 1);
    this.dataService.update(this.model).subscribe(
      res => { },
      err => {
        console.error(err);
        this.model.instruments.push(value);
      });
  }

  addItem(value: string) {
    if (!this.model.instruments)
      this.model.instruments = [];

    this.model.instruments.push(value);
    this.dataService.update(this.model).subscribe(res => { console.log(res); }, err => { console.log(err); });
    this.value = '';
  }

  togglePermission() {
    if (this.permission) {
      this.userService.revokePermission(this.userId, 'Student').subscribe(
        res => {
          if (res.ok)
            this.permission = false;
        },
        err => console.log(err)
      );
      return;
    }
    this.userService.setPermission(this.userId, 'Student').subscribe(
      res => {
        if (res.ok) {
          this.permission = true;
          this.userService.getStudent(this.userId).subscribe(obj => this.model = obj);
        }
      },
      err => console.log(err)
    );
  }
}
