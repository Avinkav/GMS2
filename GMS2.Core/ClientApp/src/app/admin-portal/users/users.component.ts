import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  searchString = '';
  users: User[];

  constructor(private userService: UserService, private modalService: NgbModal) { }

  ngOnInit() {
    console.log('attempt');
    this.userService.getUsers().subscribe(
      u => this.users = u
    );
  }

  confirmDelete(content, user) {
    this.modalService.open(content).result.then(result => {
      if (result === 'confirm') {
        this.userService.deleteUser(user.id).subscribe(
          res => { this.users.splice(this.users.indexOf(user), 1); },
          err => alert('failed'));
      }
    });
    return false;
  }

  trackByFn(index, i) {
    return i.id;
  }

}
