import { Component, OnInit } from '@angular/core';
import { slideInAnimation } from '../../slideInAnimation';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  animations: [slideInAnimation]
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
