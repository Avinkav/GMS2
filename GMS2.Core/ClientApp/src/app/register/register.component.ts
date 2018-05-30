import { Component, OnInit } from '@angular/core';
import { fadeInAnimation } from '../../fadeInAnimation';
import { User, STATES, stateSearch } from '../models/user';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { recaptchaKey } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: [fadeInAnimation]
})
export class RegisterComponent implements OnInit {

  public newUser: User = new User();
  states = STATES;
  stateSearch = stateSearch;
  recaptchaKey = recaptchaKey;
  
  constructor(private userService: UserService, private router: Router) { }


  onSubmit() {
    this.userService.register(this.newUser).subscribe(o => {
      if (o.status === 200) {
      this.router.navigateByUrl('/user-portal/profile');
      } else {
      // handle err
      }
    });
  }
  ngOnInit() {
  }

}
