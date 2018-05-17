import { Component, OnInit } from '@angular/core';
import { fadeInAnimation } from '../../fadeInAnimation';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  animations: [fadeInAnimation]
})
export class RegisterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
