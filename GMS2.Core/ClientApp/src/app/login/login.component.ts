import { Component, OnInit } from '@angular/core';
import { fadeInAnimation } from '../../fadeInAnimation';
import { UserService } from '../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ProgressService } from '../services/progress.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [fadeInAnimation]
})
export class LoginComponent implements OnInit {

  error = '';
  login = { email: '', password: '', rememberMe: true };
  returnUrl;
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.pipe(filter(params => params.returnUrl)).subscribe(params => this.returnUrl = params.returnUrl);
  }

  onSubmit() {
    this.userService.login(this.login).subscribe(res => {
        this.router.navigateByUrl(this.returnUrl);
    },
    err => this.error = 'Incorrect username and/or password'
  );
  }

}
