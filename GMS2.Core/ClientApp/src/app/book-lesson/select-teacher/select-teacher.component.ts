import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Teacher } from '../../models/teacher';

@Component({
  selector: 'app-select-teacher',
  templateUrl: './select-teacher.component.html',
  styleUrls: ['./select-teacher.component.css']
})
export class SelectTeacherComponent implements OnInit {

  @Input()  model: Teacher[];

  @Output() selectTeacher = new EventEmitter<Teacher>();
  
  constructor() { }

  ngOnInit() {
  }

  clickTeacher(t) {
    this.selectTeacher.emit(t);
  }

}
