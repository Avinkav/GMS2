import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  t = 5;

  constructor(private router: Router) { }

  ngOnInit() {
    const time = this.t;
    interval(1000).pipe(map(i => time - i)).subscribe(j => {
      this.t = j;
      if (j === 0) {
        this.router.navigateByUrl('/');
      }
    });
  }

}
