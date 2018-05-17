import { Component, OnInit } from '@angular/core';
import { slideInAnimation } from '../../slideInAnimation';
import { fadeInAnimation } from '../../fadeInAnimation';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css'],
  animations: [slideInAnimation, fadeInAnimation]
})
export class ContactUsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
