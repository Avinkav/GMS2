import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { User } from '../models/user';
import { CookieService } from 'ngx-cookie-service';
import { ProgressService } from './progress.service';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Student } from 'src/app/models/student';
import { Teacher } from '../models/teacher';
import { Router } from '@angular/router';

export const PROD_API_ROOT = 'avin.app:5000/api/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  public id = '';
  public token = '';
  public userName: BehaviorSubject<string> = new BehaviorSubject(null);
  API_ROOT = PROD_API_ROOT;

  constructor(private http: HttpClient, private cookieService: CookieService,
    private progressService: ProgressService, private router: Router) {
    if (isDevMode())
      this.API_ROOT = 'api/';
    const user = this.getCurrentLogin();
    if (user) {
      this.userName.next(user.firstName);
    }
  }

  public register(user: User) {
    return this.http.post(this.API_ROOT + 'account/register', user, { headers: this.headers, observe: 'response' }).pipe(
      tap(res => {
        if (res.ok) {
          localStorage.setItem('user', JSON.stringify(res.body));
          this.progressService.stop();
          this.userName.next(this.getCurrentLogin().firstName);
        }
      }),
      catchError(err => this.handleError(err))
    );
  }

  public login(login: any) {
    this.progressService.start();
    return this.http.post<User>(this.API_ROOT + 'account/login', login, { headers: this.headers, observe: 'response' }).pipe(
      tap(res => {
        if (res.ok) {
          localStorage.setItem('user', JSON.stringify(res.body));
          this.userName.next(res.body.firstName);
          this.progressService.stop();
        }
      }),
      catchError((error) => {
        this.progressService.stop();
        return throwError(error);
      })
    );
  }

  public getCurrentLogin(): User {
    if (localStorage.getItem('user')) {
      return JSON.parse(localStorage.getItem('user'));
    }

    return null;
  }

  public logout() {
    this.progressService.start();
    return this.http.get(this.API_ROOT + 'account/logout').pipe(
      tap(res => {
        localStorage.clear();
        this.userName.next(null);
        this.progressService.stop();
      }),
      catchError((error) => {
        this.progressService.stop();
        return throwError(error);
      })
    );
  }

  deleteUser(id: string) {
    return this.http.delete(this.API_ROOT + 'user/' + id).pipe(
      tap(null, null, () => this.progressService.stop()),
      catchError((error) => {
        this.progressService.stop();
        console.log(error);
        return throwError(error);
      })
    );
  }

  public getDetails() {
    this.progressService.start();
    return this.http.get<User>(this.API_ROOT + 'account/details').pipe(
      tap(null, null, () => this.progressService.stop()),
      catchError(err => this.handleError(err))
    );
  }

  public update(user: User) {
    this.progressService.start();
    return this.http.put(this.API_ROOT + 'account/details', user,
      { headers: this.headers, responseType: 'json', observe: 'response' }).pipe(
        tap(null, null, () => this.progressService.stop())
      );
  }

  public getUsers() {
    return this.http.get<User[]>(this.API_ROOT + 'user/list').pipe(
      catchError(err => this.handleError(err))
    );
  }

  public getUser(id) {
    return this.http.get<User>(this.API_ROOT + 'user/' + id).pipe(
      catchError(err => this.handleError(err))
    );
  }

  public setPermission(id: string, role: string) {
    return this.http.get(this.API_ROOT + 'role/' + id + '/grant/' + role,
      { headers: this.headers, responseType: 'json', observe: 'response' }).pipe(
        catchError(err => this.handleError(err))
      );
  }

  public revokePermission(id: string, role: string) {
    return this.http.get(this.API_ROOT + 'role/' + id + '/revoke/' + role,
      { headers: this.headers, responseType: 'json', observe: 'response' }).pipe(
        catchError(err => this.handleError(err))
      );
  }

  public getPermissions(id: string) {
    this.progressService.start();
    return this.http.get(this.API_ROOT + 'role/' + id, { headers: this.headers, responseType: 'json', observe: 'response' }).pipe(
      tap(null, null, () => this.progressService.stop()),
      catchError(err => this.handleError(err))
    );
  }

  public getStudent(id: string) {
    this.progressService.start();
    return this.http.get<Student>(this.API_ROOT + 'student/' + id, { headers: this.headers, responseType: 'json' }).pipe(
      tap(null, null, () => this.progressService.stop()),
      catchError(err => this.handleError(err))
    );
  }

  public getTeacher(id: string) {
    this.progressService.start();
    return this.http.get<Teacher>(this.API_ROOT + 'teacher/' + id, { headers: this.headers, responseType: 'json' }).pipe(
      tap(null, null, () => this.progressService.stop()),
      catchError((error) => {
        this.progressService.stop();
        return throwError(error);
      })
    );
  }

  handleError(err: HttpErrorResponse) {
    if (err.status === 401) {
      // redirect to login
      return this.router.navigateByUrl('/login');
    }
    return throwError(err);
  }

}

