import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teacher-portal',
  template: `<app-portal [navItems]="navItems"></app-portal>`,
  styles: [``]
})
export class TeacherPortalComponent implements OnInit {

  navItems = [
    { anchor: 'Dashboard', link: 'dashboard'},
    { anchor: 'Classes', link: 'classes'},
    { anchor: 'Income', link: 'income'},
];

  constructor() { }

  ngOnInit() {
  }

}
