import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { CookieService } from 'ngx-cookie-service';
import { ProgressService } from './progress.service';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

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

  constructor(private http: HttpClient, private cookieService: CookieService, private progressService: ProgressService) {
    this.userName.next(this.getCurrentLogin());
  }

  public register(user: User) {
    return this.http.post('api/account/register', user, { headers: this.headers, responseType: 'text', observe: 'response' }).pipe(
      tap(res => {
        if (res.status === 200) {
          this.cookieService.set('name', res.body);
          this.progressService.setProgress(false);
          this.userName.next(this.getCurrentLogin());
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
    return this.http.post('api/account/login', login, { headers: this.headers, responseType: 'text', observe: 'response' }).pipe(
      tap(res => {
        if (res.status === 200) {
          this.cookieService.set('name', res.body);
          this.progressService.setProgress(false);
          this.userName.next(this.getCurrentLogin());
        }
      }),
      catchError((error) => {
        this.progressService.setProgress(false);
        return throwError(error);
      })
    );
  }

  public getCurrentLogin() {
    if (this.cookieService.check('name')) {
      return this.cookieService.get('name');
    }

    return null;
  }

  public logout() {
    this.progressService.setProgress(true);
    return this.http.get('api/account/logout').pipe(
      tap(res => {
        this.cookieService.deleteAll();
        this.userName.next(this.getCurrentLogin());
        this.progressService.setProgress(false);
      }),
      catchError((error) => {
        this.progressService.setProgress(false);
        return throwError(error);
      })
    );

  }

  public getDetails() {
    this.progressService.setProgress(true);
    return this.http.get<User>('api/account/details', this.getAuthHeader()).pipe(
      tap(u => this.progressService.setProgress(false)),
      catchError((error) => {
        this.progressService.setProgress(false);
        return throwError(error);
      })
    );
  }

  public update(user: User) {
    this.progressService.setProgress(true);
    return this.http.put('api/account/details', user, { headers: this.headers, responseType: 'json', observe: 'response' }).pipe(
      tap(res => {
        if (res.status === 200) {
          this.progressService.setProgress(false);
        }
      })
    );
  }

  public getUsers() {
    return this.http.get<User[]>('api/user/list', this.getAuthHeader());
  }

  public getUser(id) {
    return this.http.get<User>('api/user/' + id);
  }

  public setPermission(id: string, role: string) {
    return this.http.get('api/role/' + id + '/grant/' + role, { headers: this.headers, responseType: 'json', observe: 'response' });
  }

  public revokePermission(id: string, role: string){
    return this.http.get('api/role/' + id + '/revoke/' + role, { headers: this.headers, responseType: 'json', observe: 'response' });
  }

  public getPermissions(id: string) {
    this.progressService.start();
    return this.http.get('api/role/' + id, { headers: this.headers, responseType: 'json', observe: 'response' } ).pipe(
      tap(this.progressService.stop()),
      catchError((error) => {
        this.progressService.setProgress(false);
        return throwError(error);
      })
    );
  }

  public getAuthHeader() {
    return { headers: { Authorization: 'bearer ' + this.getToken() } };
  }

  public getToken() {
    return this.cookieService.get('token');
  }

}

