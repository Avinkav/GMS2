import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { UserService } from './services/user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'app';
  scrollTop = 0;

  constructor(private userService: UserService) {}

  ngOnInit()  {

    $(document).scroll(() => {
      const st = $(document).scrollTop();
      if (st > this.scrollTop) {
        $('.navbar').slideUp('fast', 'swing');
      } else {
        $('.navbar').slideDown('fast', 'swing');
      }
      this.scrollTop  = st;
    });
  }

  logout() {
    this.userService.logout();
  }
}
