import { Component, OnInit, ViewChild } from '@angular/core';
import { slideInAnimation } from '../../slideInAnimation';
import { fadeInAnimation } from '../../fadeInAnimation';
import { bgImageAnimation } from '../../bgImgAnimation';
import { Observable, interval } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [slideInAnimation, fadeInAnimation, bgImageAnimation]
})
export class HomeComponent implements OnInit {

  @ViewChild('coverPage') coverPage: HTMLDivElement;

  images = [ {src: '/assets/piano.jpg', show: true},
  {src: '/assets/guitar.jpg', show: false},
  {src: '/assets/violin.jpg', show: false}
  ];
  counter = 0;
  currentBackground = this.images[0];

  constructor() { }

  ngOnInit() {
    this.changeWallpaper();
  }

  changeWallpaper() {
  interval(5000).subscribe(() => {

    this.images[this.counter].show = false;
    this.counter = (this.counter < this.images.length - 1) ? this.counter + 1 : 0;
    this.images[this.counter].show = true;
  });
  }
}
