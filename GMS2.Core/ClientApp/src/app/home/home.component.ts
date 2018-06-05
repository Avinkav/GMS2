import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { slideInAnimation } from '../../slideInAnimation';
import { fadeInAnimation } from '../../fadeInAnimation';
import { bgImageAnimation } from '../../bgImgAnimation';
import { Observable, interval } from 'rxjs';
import * as $ from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [slideInAnimation, fadeInAnimation, bgImageAnimation]
})
export class HomeComponent implements OnInit, OnDestroy {

  title = 'app';
  scrollTop = 0;

  @ViewChild('coverPage') coverPage: HTMLDivElement;

  images = [{ src: '/assets/piano.jpg', show: true },
  { src: '/assets/guitar.jpg', show: false },
  { src: '/assets/violin.jpg', show: false }
  ];
  counter = 0;
  currentBackground = this.images[0];

  constructor() { }

  ngOnInit() {
    this.changeWallpaper();

    $(document).scroll(() => {
      const st = $(document).scrollTop();
      if (st > this.scrollTop) {
        $('.navbar').slideUp('fast', 'swing');
      } else {
        $('.navbar').slideDown('fast', 'swing');
      }
      this.scrollTop = st;
    });
  }

  changeWallpaper() {
    interval(5000).subscribe(() => {

      this.images[this.counter].show = false;
      this.counter = (this.counter < this.images.length - 1) ? this.counter + 1 : 0;
      this.images[this.counter].show = true;
    });
  }

  ngOnDestroy(): void {
    $().off();
  }
}
