import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teacher-portal',
  templateUrl: './teacher-portal.component.html',
  styleUrls: ['./teacher-portal.component.css']
})
export class TeacherPortalComponent implements OnInit {

  navItems = [
    { anchor: 'Dashboard', link: 'dashboard'},
    { anchor: 'Classes', link: 'classes'},
    { anchor: 'Income', link: 'Income'},
];

  constructor() { }

  ngOnInit() {
  }

}
