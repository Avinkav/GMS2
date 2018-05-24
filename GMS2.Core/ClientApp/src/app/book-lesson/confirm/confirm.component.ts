import { Component, OnInit, Input } from '@angular/core';
import { Lesson } from 'src/app/models/lesson';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  @Input() model: Lesson;

  constructor() { }

  ngOnInit() {
  }

}
