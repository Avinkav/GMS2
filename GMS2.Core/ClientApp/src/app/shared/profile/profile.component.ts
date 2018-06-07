import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { User, STATES } from '../../models/user';
import { UserService } from '../../services/user.service';
import { slideInAnimation } from '../../../slideInAnimation';
import { ProgressService } from '../../services/progress.service';
import { Student } from 'src/app/models/student';
import { Teacher } from '../../models/teacher';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  animations: [slideInAnimation]
})
export class ProfileComponent implements OnInit {

  user: User = new User();
  @Input() userId;
  studentId: string = null;
  teacherId: string = null;

  title = 'Profile';
  admin = false;

  constructor(private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.userId = this.route.snapshot.paramMap.get('id');
    if (this.userId) {
      this.userService.getUser(this.userId).subscribe(data => {
        this.user = data;
        this.title = 'User details';
        this.admin = true;
      });
      return;
    }
    // if a userId hasn't been passed, get current login
    const user = this.userService.getCurrentLogin();
    if (user) {
      this.user = user;
    }
    // Refresh with data from server
    this.userService.getDetails().subscribe(data => {
      console.log(data);
      this.user = data;
      this.title = 'Profile';
    });
  }
}
