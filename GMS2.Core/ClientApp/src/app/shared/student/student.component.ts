import { Component, OnInit, Input } from '@angular/core';
import { Student } from '../../models/student';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { UserService } from '../../services/user.service';
import { shrinkInOut } from '../../animations/shrinkInOut';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
  animations: [shrinkInOut]
})
export class StudentComponent implements OnInit {

  @Input() model: Student;
  @Input() permission;
  @Input() userId;

  constructor(private userService: UserService) { }

  ngOnInit() {

  }

  removeItem(i: string) {
    this.model.instruments.splice(this.model.instruments.indexOf(i), 1);
  }

  addItem(box: any) {
    this.model.instruments.push(box.value);
    box.value = '';
  }

  togglePermission() {
    if (this.permission) {
      // revoke
      this.userService.revokePermission(this.userId, 'Student').subscribe(
        res => {
          if (res.ok) {
            this.permission = false;
          }
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
