import { Component, OnInit, Input } from '@angular/core';
import { STATES, User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { ProgressService } from 'src/app/services/progress.service';
import { slideInAnimation } from '../../../slideInAnimation';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
  animations: [slideInAnimation]
})
export class UserDetailsComponent implements OnInit {

  states = STATES;
  @Input() model: User;
  @Input() title: string;
  edit = false;

  constructor(private userService: UserService, private progressService: ProgressService) { }

  ngOnInit() {
    // this.userService.getDetails().subscribe(o => {
    //   this.user = o;
    // });
  }

  onSubmit() {
    if (this.edit === true) {
      this.userService.update(this.model).subscribe(o => {
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
}
