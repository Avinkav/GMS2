import { Component, OnInit } from '@angular/core';
import { fadeInAnimation } from '../../fadeInAnimation';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ProgressService } from '../services/progress.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [fadeInAnimation]
})
export class LoginComponent implements OnInit {
  
  error = '';
  login = { email: '', password: '', rememberMe: true };

  constructor(private userService: UserService, private router: Router,
    private cookieService: CookieService,
    private progressService: ProgressService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.userService.login(this.login).subscribe(res => {
      if (res.ok) {
        this.router.navigateByUrl('/user-portal/dashboard');
        return;
      }
    },
    err => this.error = 'Incorrect username and/or password'
  );
  }

}
