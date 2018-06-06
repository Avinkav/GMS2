import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-portal',
  template:   `<app-portal [navItems]="navItems"></app-portal>`,
  styles: ['']
})
export class UserPortalComponent implements OnInit {

  navItems = [
    { anchor: 'Dashboard', link: 'dashboard', icon: 'dashboard' },
    { anchor: 'Lessons', link: 'lessons', icon: 'assignment'},
    { anchor: 'Instruments', link: 'instruments', icon: 'queue_music'},
    { anchor: 'Billing', link: 'billing', icon: 'monetization_on'},
    { anchor: 'Profile', link: 'profile', icon: 'profile'}
];

  constructor() { }

  ngOnInit() {
  }

}
