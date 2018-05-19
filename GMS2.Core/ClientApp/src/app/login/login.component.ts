import { Component, OnInit } from '@angular/core';
import { fadeInAnimation } from '../../fadeInAnimation';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [fadeInAnimation]
})
export class LoginComponent implements OnInit {

  login = { email: '', password: '' };

  constructor(private userService: UserService, private router: Router, private cookieService: CookieService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.userService.login(this.login).subscribe(o => {
      if (o.status === 200 ) {
        this.userService.token = o.body;
        this.cookieService.set('token', o.body);
        this.router.navigateByUrl('/user-portal/dashboard');
      }
    });
  }

}
