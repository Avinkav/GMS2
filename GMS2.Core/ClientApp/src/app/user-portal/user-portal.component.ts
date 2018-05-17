import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-portal',
  templateUrl: './user-portal.component.html',
  styleUrls: ['./user-portal.component.css']
})
export class UserPortalComponent implements OnInit {

  navItems = [
    { anchor: 'Dashboard', link: 'dashboard'},
    { anchor: 'Lessons', link: 'lessons'},
    { anchor: 'Billing', link: 'billing'},
    { anchor: 'Profile', link: 'profile'},
];

  constructor() { }

  ngOnInit() {
  }

}
