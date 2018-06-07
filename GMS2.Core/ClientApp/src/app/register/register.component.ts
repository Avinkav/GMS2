import { Component, OnInit } from '@angular/core';
import { fadeInAnimation } from '../../fadeInAnimation';
import { User, STATES, stateSearch } from '../models/user';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { recaptchaKey } from 'src/environments/environment';
import { HttpErrorResponse } from '@angular/common/http';

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
  errors: any[];
  cPassword = '';
  cPasswordPristine = true;

  constructor(private userService: UserService, private router: Router) { }


  onSubmit() {
    this.userService.register(this.newUser).subscribe(user => {
        this.router.navigateByUrl('/user-portal/profile');
    }, (err: HttpErrorResponse) => {
      if (err.hasOwnProperty('error'))
        this.errors = err.error;
    });
  }

  ngOnInit() {
  }

}
