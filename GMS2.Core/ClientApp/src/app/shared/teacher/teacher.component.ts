import { Component, OnInit, Input } from '@angular/core';
import { Teacher } from '../../models/teacher';
import { UserService } from 'src/app/services/user.service';
import { shrinkInOut } from '../../animations/shrinkInOut';
import { DataService } from '../../services/data.service';

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

  constructor(private userService: UserService, private dataService: DataService) { }

  ngOnInit() {

  }

  removeItem(i: string) {
    this.model.instrumentsTaught.splice(this.model.instrumentsTaught.indexOf(i), 1);
  }

  getIndex(index) {
    return index;
  }

  addItem(box: any) {
    console.log(this.model.instrumentsTaught);
    if (!this.model.instrumentsTaught)
      this.model.instrumentsTaught = [];
    console.log(this.model.instrumentsTaught);
    this.model.instrumentsTaught.push(box.value);
    this.dataService.update(this.model).subscribe(res => {
      // if (res.ok)

    },
    err => {

  });
    box.value = '';
  }

  togglePermission() {
    if (this.permission) {
      // revoke
      this.userService.revokePermission(this.userId, 'Teacher').subscribe(
        res => {
          if (res.ok)
            this.permission = false;

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


