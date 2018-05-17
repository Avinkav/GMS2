import { Component, OnInit } from '@angular/core';
import { slideInAnimation } from '../../slideInAnimation';
import { fadeInAnimation } from '../../fadeInAnimation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [slideInAnimation, fadeInAnimation]
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
