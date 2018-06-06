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

export const PROD_API_ROOT = 'api/';

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

  constructor(private http: HttpClient,
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
          this.userName.next(this.getCurrentLogin().firstName);
        }
      }),
      catchError(err => this.handleError(err))
    );
  }

  public login(login: any) {
    return this.http.post<User>(this.API_ROOT + 'account/login', login, { headers: this.headers, observe: 'response' }).pipe(
      tap(res => {
        if (res.ok) {
          localStorage.setItem('user', JSON.stringify(res.body));
          this.userName.next(res.body.firstName);
        }
      })
    );
  }

  public getCurrentLogin(): User {
    const user = localStorage.getItem('user');
    if (user) {
      return JSON.parse(user);
    }
    // further handling to be added later
    return null;
  }

  public logout() {
    return this.http.get(this.API_ROOT + 'account/logout').pipe(
      tap(res => {
        localStorage.clear();
        this.userName.next(null);
      }),
    );
  }

  public deleteUser(id: string) {
    return this.http.delete(this.API_ROOT + 'user/' + id)
  }

  public getDetails() {
    return this.http.get<User>(this.API_ROOT + 'account/details')
  }

  public update(user: User) {
    return this.http.put(this.API_ROOT + 'account/details', user,
      { headers: this.headers, responseType: 'json', observe: 'response' });
  }

  public getUsers() {
    return this.http.get<User[]>(this.API_ROOT + 'user/list');
  }

  public getUser(id) {
    return this.http.get<User>(this.API_ROOT + 'user/' + id);
  }

  public setPermission(id: string, role: string) {
    return this.http.get(this.API_ROOT + 'role/' + id + '/grant/' + role,
      { headers: this.headers, responseType: 'json', observe: 'response' });
  }

  public revokePermission(id: string, role: string) {
    return this.http.get(this.API_ROOT + 'role/' + id + '/revoke/' + role,
      { headers: this.headers, responseType: 'json', observe: 'response' });
  }

  public getPermissions(id: string) {

    return this.http.get(this.API_ROOT + 'role/' + id, { headers: this.headers, responseType: 'json', observe: 'response' });
  }

  public getStudent(id: string) {

    return this.http.get<Student>(this.API_ROOT + 'student/' + id, { headers: this.headers, responseType: 'json' });
  }

  public getTeacher(id: string) {

    return this.http.get<Teacher>(this.API_ROOT + 'teacher/' + id, { headers: this.headers, responseType: 'json' });
  }

  handleError(err: HttpErrorResponse) {
    return throwError(err);
  }

}

