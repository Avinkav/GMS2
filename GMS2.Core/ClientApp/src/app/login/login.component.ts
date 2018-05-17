import { Component, OnInit } from '@angular/core';
import { fadeInAnimation } from '../../fadeInAnimation';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [fadeInAnimation]
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
