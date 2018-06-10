import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

  breadcrumbs: Breadcrumb[] = [];
  constructor(private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.breadcrumbs = this.getBreadcrumbs(this.activatedRoute.root);
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(event => {
      // console.log(this.activatedRoute.root);
      this.breadcrumbs = this.getBreadcrumbs(this.activatedRoute.root);
    });
  }

  getBreadcrumbs(route: ActivatedRoute, url = '', crumbs: Breadcrumb[] = []) {
    route.children.forEach(child => {
      if (!child.data)
        return this.getBreadcrumbs(child, url, crumbs);

      url += '/' + child.snapshot.url.map(u => u.path).join('/');
      crumbs.push(
        {
          link: url,
          title: child.snapshot.data['breadcrumb']
        }
      );
      return this.getBreadcrumbs(child, url, crumbs);
    });
    return crumbs;
  }

}

export class Breadcrumb {
  title: string;
  link: string;
}
