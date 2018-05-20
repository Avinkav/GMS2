import { Component, OnInit } from '@angular/core';
import { User, STATES } from '../../models/user';
import { UserService } from '../../services/user.service';
import { slideInAnimation } from '../../../slideInAnimation';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  animations: [slideInAnimation]
})
export class ProfileComponent implements OnInit {

  states = STATES;
  user = new User();
  edit = false;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getDetails().subscribe( o => {
      console.log(o);
      this.user = o;
      console.log(this.user);
    });
  }

}
