import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ProgressService } from './progress.service';
import { tap, catchError } from 'rxjs/operators';
import { Teacher } from '../models/teacher';
import { Lesson } from '../models/lesson';
import { throwError } from 'rxjs';
import { PROD_API_ROOT } from './user.service';
import { Student, isStudent } from '../models/student';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  API_ROOT = PROD_API_ROOT;

  constructor(private http: HttpClient, private progressService: ProgressService, private router: Router) {
    if (isDevMode())
      this.API_ROOT = 'api/';
  }

  public getTeachers() {
    this.progressService.start();
    return this.http.get<Teacher[]>(this.API_ROOT + 'teacher/list/10').pipe(
      tap(null, null, () => this.progressService.stop()),
    );
  }

  public update(model: Teacher | Student) {
    let path = this.API_ROOT;
    if (isStudent(model))
      path += 'student/';
    else
      path += 'teacher/';
    return this.http.put(path + model.id, model, { observe: 'response' }).pipe(
      catchError(err => this.handleError(err))
    );
  }

  public newLesson(model: Lesson) {
    this.progressService.start();
    return this.http.post(this.API_ROOT + 'lesson', model, { observe: 'response' }).pipe(
      tap(null, null, () => this.progressService.stop()),
      catchError(err => this.handleError(err))
    );
  }

  public getLessons(model: Teacher | Student) {
    let requestUrl = '';
    if (isStudent(model))
      requestUrl = this.API_ROOT + 'lesson/student/' + model.id;
    else
      requestUrl = this.API_ROOT + 'lesson/teacher/' + model.id;

    console.log(requestUrl);
    this.progressService.start();
    return this.http.get<Lesson[]>(requestUrl).pipe(
      tap(null, null, () => this.progressService.stop()),
      catchError(err => this.handleError(err))
    );
  }

  handleError(err: HttpErrorResponse) {
    this.progressService.stop();
    if (err.status === 401) {
      // redirect to login
      this.router.navigateByUrl('/login');
    }
    this.progressService.stop();
    return throwError(err);
  }

}
