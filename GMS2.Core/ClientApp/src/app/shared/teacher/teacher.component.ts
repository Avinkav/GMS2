import { Component, OnInit, Input } from '@angular/core';
import { Teacher } from '../../models/teacher';
import { UserService } from 'src/app/services/user.service';
import { shrinkInOut } from '../../animations/shrinkInOut';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css'],
  animations: [shrinkInOut]
})
export class TeacherComponent implements OnInit {

  @Input() model: Teacher;
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
      this.userService.revokePermission(this.userId, 'Teacher').subscribe(
        res => {
          if (res.ok) {
            this.permission = false;
          }
        },
        err => console.log(err)
      );
      return;
    }
    this.userService.setPermission(this.userId, 'Teacher').subscribe(
      res => {
        if (res.ok) {
          this.permission = true;
          this.userService.getTeacher(this.userId).subscribe(obj => this.model = obj);
        }
      },
      err => console.log(err)
    );
  }
}


