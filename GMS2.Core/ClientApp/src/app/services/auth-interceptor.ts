import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private router: Router) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return next.handle(req).pipe(
            catchError(err => {
                if (err.status === 401) {
                    // redirect to login
                    console.log('auth interceptor redirecting');
                    this.router.navigate(['/login'], {queryParams: {returnUrl: 'test'}});
                    return throwError(err);
                }
                console.log(err);
                return throwError(err);
            }));
    }
}
