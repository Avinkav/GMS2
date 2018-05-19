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

  confirmDelete(content) {
    this.modalService.open(content).result.then(result => {
      console.log(result);
    });
    return false;
  }

}
