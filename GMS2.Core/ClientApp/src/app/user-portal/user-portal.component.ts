import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-portal',
  template:   `<app-portal [navItems]="navItems"></app-portal>`,
  styles: ['']
})
export class UserPortalComponent implements OnInit {

  navItems = [
    { anchor: 'Dashboard', link: 'dashboard'},
    { anchor: 'Lessons', link: 'lessons'},
    { anchor: 'Instruments', link: 'instruments'},
    { anchor: 'Billing', link: 'billing'},
    { anchor: 'Profile', link: 'profile'}
];

  constructor() { }

  ngOnInit() {
  }

}
