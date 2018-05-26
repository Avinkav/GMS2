import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Lesson } from 'src/app/models/lesson';
// import * as faker from 'faker';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  @Input() model: Lesson;
  @Output() confirm = new EventEmitter();
  @Output() cancel = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  cancelClick(e: Event) {
    this.cancel.emit(e);
  }

  confirmClick(e: Event) {
    this.confirm.emit(e);
  }
}
