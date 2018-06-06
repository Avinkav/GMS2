import { Component, OnInit, Input } from '@angular/core';
import { STATES, User, stateSearch } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { ProgressService } from 'src/app/services/progress.service';
import { slideInAnimation } from '../../../slideInAnimation';
import { filter } from 'rxjs/operators';
import { HttpResponse } from 'selenium-webdriver/http';

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
  stateSearch = stateSearch;
  avatarPath = 'assets/portrait1.jpg';
  hideUpload = true;

  constructor(private userService: UserService, private progressService: ProgressService) { }

  ngOnInit() {
  }

  onSubmit() {
    if (this.edit === true) {
      this.userService.update(this.model).subscribe(o => {
        if (o.status === 200) {
          this.edit = false;
          return;
        } else {
          // handle err
          return;
        }
      });
    }
    this.edit = true;
  }

  onFileChanged(event) {
    const file = event.target.files[0];
    this.userService.uploadPic(file).subscribe((res: any) => {
      if (res.ok)
        this.avatarPath = res.body.avatarPath; // handle event here
    });
  }
}
