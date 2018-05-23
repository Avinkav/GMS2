import { Component, OnInit, Input } from '@angular/core';
import { Teacher } from '../../models/teacher';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {

  @Input() model: Teacher;

  constructor() { }

  ngOnInit() {
  }

}
