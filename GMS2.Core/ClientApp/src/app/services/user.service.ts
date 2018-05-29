import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { CookieService } from 'ngx-cookie-service';
import { ProgressService } from './progress.service';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Student } from 'src/app/models/student';
import { Teacher } from '../models/teacher';

export const PROD_API_ROOT = 'avin.app:5000/';

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

  constructor(private http: HttpClient, private cookieService: CookieService, private progressService: ProgressService) {
    if (isDevMode())
      this.API_ROOT = '';
    const user = this.getCurrentLogin();
    if (user) {
      this.userName.next(user.firstName);
    }
  }

  public register(user: User) {
    return this.http.post(this.API_ROOT + 'api/account/register', user, { headers: this.headers, observe: 'response' }).pipe(
      tap(res => {
        if (res.status === 200) {
          localStorage.setItem('user', JSON.stringify(res.body));
          this.progressService.setProgress(false);
          this.userName.next(this.getCurrentLogin().firstName);
        }
      }),
      catchError((error) => {
        this.progressService.setProgress(false);
        return throwError(error);
      })
    );
  }

  public login(login: any) {
    this.progressService.setProgress(true);
    return this.http.post<User>(this.API_ROOT + 'api/account/login', login, { headers: this.headers, observe: 'response' }).pipe(
      tap(res => {
        if (res.ok) {
          localStorage.setItem('user', JSON.stringify(res.body));
          this.userName.next(res.body.firstName);
          this.progressService.setProgress(false);
        }
      }),
      catchError((error) => {
        this.progressService.setProgress(false);
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
    this.progressService.setProgress(true);
    return this.http.get(this.API_ROOT + 'api/account/logout').pipe(
      tap(res => {
        localStorage.clear();
        this.userName.next(null);
        this.progressService.setProgress(false);
      }),
      catchError((error) => {
        this.progressService.setProgress(false);
        return throwError(error);
      })
    );

  }

  deleteUser(id: string) {
    return this.http.delete(this.API_ROOT + 'api/user/' + id).pipe(
      tap(null, null, this.progressService.stop()),
      catchError((error) => {
        this.progressService.setProgress(false);
        console.log(error);
        return throwError(error);
      })
    );
  }

  public getDetails() {
    this.progressService.setProgress(true);
    return this.http.get<User>(this.API_ROOT + 'api/account/details').pipe(
      tap(u => this.progressService.setProgress(false)),
      catchError((error) => {
        this.progressService.setProgress(false);
        return throwError(error);
      })
    );
  }

  public update(user: User) {
    this.progressService.setProgress(true);
    return this.http.put(this.API_ROOT + 'api/account/details', user, 
    { headers: this.headers, responseType: 'json', observe: 'response' }).pipe(
      tap(res => {
        if (res.status === 200) {
          this.progressService.setProgress(false);
        }
      })
    );
  }

  public getUsers() {
    return this.http.get<User[]>(this.API_ROOT + 'api/user/list');
  }

  public getUser(id) {
    return this.http.get<User>(this.API_ROOT + 'api/user/' + id);
  }

  public setPermission(id: string, role: string) {
    return this.http.get(this.API_ROOT + 'api/role/' + id + '/grant/' + role,
     { headers: this.headers, responseType: 'json', observe: 'response' });
  }

  public revokePermission(id: string, role: string){
    return this.http.get(this.API_ROOT + 'api/role/' + id + '/revoke/' + role, 
    { headers: this.headers, responseType: 'json', observe: 'response' });
  }

  public getPermissions(id: string) {
    this.progressService.start();
    return this.http.get(this.API_ROOT + 'api/role/' + id, { headers: this.headers, responseType: 'json', observe: 'response' } ).pipe(
      tap(this.progressService.stop()),
      catchError((error) => {
        this.progressService.stop();
        return throwError(error);
      })
    );
  }

  public getStudent(id: string) {
    this.progressService.start();
    return this.http.get<Student>(this.API_ROOT + 'api/student/' + id, { headers: this.headers, responseType: 'json' } ).pipe(
      tap(null, null , this.progressService.stop()),
      catchError((error) => {
        this.progressService.stop();
        return throwError(error);
      })
    );
  }

  public getTeacher(id: string) {
    this.progressService.start();
    return this.http.get<Teacher>(this.API_ROOT + 'api/teacher/' + id, { headers: this.headers, responseType: 'json' } ).pipe(
      tap(null, null , this.progressService.stop()),
      catchError((error) => {
        this.progressService.stop();
        return throwError(error);
      })
    );
  }

}

