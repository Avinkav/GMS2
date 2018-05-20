import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'app';
  scrollTop = 0;
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
}
