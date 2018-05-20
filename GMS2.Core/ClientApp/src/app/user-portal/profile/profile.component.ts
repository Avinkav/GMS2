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

  states = STATES;
  user = new User();
  edit = false;

  constructor(private userService: UserService, private progressService: ProgressService) { }

  ngOnInit() {

    this.userService.getDetails().subscribe( o => {
      console.log(o);
      this.user = o;
     });
  }

  ngAfterViewInit() {
  }

}
