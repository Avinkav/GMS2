import { Component, OnInit, Input } from '@angular/core';
import { Student } from '../../models/student';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
  animations: [
    trigger('shrinkInOut', [
      state('in', style({ height: '*' })),
      transition('* => void', [
        style({ height: '*' }),
        animate(250, style({ height: 0 }))
      ]),
      transition('void => *', [
        style({ height: '0' }),
        animate(250, style({ height: '*' }))
      ])
    ])
  ]
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
          // this.
        }
      },
      err => console.log(err)
    );
  }
}
