import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  searchString = '';
  users: User[];
  closeResult: string;

  constructor(private userService: UserService, private modalService: NgbModal) { }

  open(contract) {
    this.modalService.open(contract).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

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
