import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { CookieService } from 'ngx-cookie-service';
import { ProgressService } from './progress.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

    headers = new HttpHeaders({
      'Content-Type':  'application/json',
    });
    public id = '';
    public token = '';

  constructor(private http: HttpClient, private cookieService: CookieService, private progressService: ProgressService) { }

  public register(user: User) {
    return this.http.post('api/account/register', user, { headers: this.headers, responseType: 'text', observe: 'response' });

  }

  public login(login: any) {
    this.progressService.setProgress(true);
    return this.http.post('api/account/login', login, { headers: this.headers, responseType: 'text', observe: 'response' } ).pipe(
      tap(res => {
        if (res.status === 200) {
          this.token = res.body;
          this.cookieService.set('token', res.body);
          this.progressService.setProgress(false);
        }
      }));
  }

  public logout() {
    return this.cookieService.deleteAll();
  }

  public getDetails() {
    this.progressService.setProgress(true);
    return this.http.get<User>('api/account/details', this.getAuthHeader()).pipe(
      tap(u => this.progressService.setProgress(false))
    );
  }

  public getUsers() {
    return this.http.get<User[]>('api/user/list', this.getAuthHeader());
  }

  public getAuthHeader() {
    return { headers: {Authorization: 'bearer ' + this.getToken()} };
  }

  public getToken() {
    return this.cookieService.get('token');
  }

  }

