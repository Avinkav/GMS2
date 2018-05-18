import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  constructor(private http: HttpClient) { }

  public register(user: User) {
    return this.http.post<User>('api/account/register', user, this.httpOptions);

  }

  public login(login: any) {
    return this.http.post<User>('api/account/login', login, this.httpOptions);

  }
}
