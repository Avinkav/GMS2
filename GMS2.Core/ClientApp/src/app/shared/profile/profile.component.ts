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
export class ProfileComponent implements OnInit, AfterViewInit {

  user: User = new User();
  @Input() userId;
  studentId: string = null;
  teacherId: string = null;

  title = '';
  admin = false;

  constructor(private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.userId = this.route.snapshot.paramMap.get('id');
    // if a userId hasn't been passed, treat request as personal profile
    if (!this.userId) {
      this.userService.getDetails().subscribe(data => {
        this.user = data;
        this.title = 'Profile';
      });
    } else {
      this.userService.getUser(this.userId).subscribe( data => {
        this.user = data;
        this.title = 'User details';
        this.admin = true;
      });
    }
  }

  ngAfterViewInit() {
  }

}
