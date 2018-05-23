import { Component, OnInit, AfterViewInit } from '@angular/core';
import { User, STATES } from '../../models/user';
import { UserService } from '../../services/user.service';
import { slideInAnimation } from '../../../slideInAnimation';
import { ProgressService } from '../../services/progress.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  animations: [slideInAnimation]
})
export class ProfileComponent implements OnInit, AfterViewInit {

  dt: any;
  states = STATES;
  user = new User();
  edit = false;

  constructor(private userService: UserService, private progressService: ProgressService) { }

  ngOnInit() {
    this.dt = new Date();
    this.userService.getDetails().subscribe(o => {
      this.user = o;
    });
  }

  onSubmit() {
    if (this.edit === true) {
      this.userService.update(this.user).subscribe(o => {
        if (o.status === 200) {
          // saved succesfully
          return;
        } else {
          // handle err
          return;
        }
      });
    }
      this.edit = true;
  }

  ngAfterViewInit() {
  }

}
