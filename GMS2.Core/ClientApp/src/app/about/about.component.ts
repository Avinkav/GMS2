import { Component, OnInit } from '@angular/core';
import { slideInAnimation } from '../../slideInAnimation';
import { fadeInAnimation } from '../../fadeInAnimation';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  animations: [slideInAnimation, fadeInAnimation]
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
