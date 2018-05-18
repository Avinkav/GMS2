import { Component, OnInit } from '@angular/core';
import { fadeInAnimation } from '../../fadeInAnimation';
import { User, STATES } from '../models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: [fadeInAnimation]
})
export class RegisterComponent implements OnInit {

  newUser: User = new User();
  states = STATES;
  constructor() { }

  ngOnInit() {
  }

}
