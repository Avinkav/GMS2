import { Component, OnInit } from '@angular/core';
import { slideInAnimation } from '../../../slideInAnimation';

@Component({
  selector: 'app-home-carousel',
  templateUrl: './home-carousel.component.html',
  animations: [slideInAnimation],
  styleUrls: ['./home-carousel.component.css']
})
export class HomeCarouselComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
