import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-portal',
  templateUrl: './admin-portal.component.html',
  styleUrls: ['./admin-portal.component.css']
})
export class AdminPortalComponent implements OnInit {

  navItems = [
    { anchor: 'Dashboard', link: 'dashboard'},
    { anchor: 'Users', link: 'users'},
    { anchor: 'Classes', link: 'classes'},
    { anchor: 'Finances', link: 'finances'},
    { anchor: 'Profile', link: 'profile'},
];
  constructor() { }

  ngOnInit() {
  }

}
