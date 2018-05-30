import { Component, OnInit } from '@angular/core';
import { slideInAnimation } from '../../slideInAnimation';
import { fadeInAnimation } from '../../fadeInAnimation';
import { recaptchaKey} from 'src/environments/environment';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css'],
  animations: [slideInAnimation, fadeInAnimation]
})
export class ContactUsComponent implements OnInit {

  recaptchaKey = recaptchaKey;
  
  constructor() { }

  ngOnInit() {
  }

}
