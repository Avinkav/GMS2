import { Component, OnInit } from '@angular/core';
import { fadeInAnimation } from '../../fadeInAnimation';
import { User, STATES } from '../models/user';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: [fadeInAnimation]
})
export class RegisterComponent implements OnInit {

  newUser: User = new User();
  states = STATES;

  constructor(private userService: UserService, private router: Router) { }

  onSubmit() {
    this.userService.register(this.newUser).subscribe(o => {
      if (o.status === 200) {
      this.router.navigateByUrl('/user-portal/profile');
      } else {
      // handle err
      }

    })
      ;
  }
  ngOnInit() {
  }

}
