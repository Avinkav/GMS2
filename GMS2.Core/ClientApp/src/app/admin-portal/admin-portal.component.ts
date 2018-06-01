import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-portal',
  template: `<app-portal [navItems]="navItems" ></app-portal>`,
  styles: ['']
})
export class AdminPortalComponent implements OnInit {

  navItems = [
    { anchor: 'Dashboard', link: 'dashboard'},
    { anchor: 'Users', link: 'users'},
    { anchor: 'Classes', link: 'classes'},
    { anchor: 'Finances', link: 'finances'}
];
  constructor() { }

  ngOnInit() {
  }

}
