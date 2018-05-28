import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ProgressService } from './progress.service';
import { tap, catchError } from 'rxjs/operators';
import { Teacher } from '../models/teacher';
import { Lesson } from '../models/lesson';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient, private progressService: ProgressService) {
  }

  handleError(err: HttpErrorResponse) {
    if (err.status === 401) {
      // redirect to login
    }
    return throwError(err);
  }

  public getTeachers() {
    this.progressService.start();
    return this.http.get<Teacher[]>('api/teacher/list/10').pipe(
      tap(null, null, this.progressService.stop()),
    );
  }

  public update(teacher: Teacher) {
    return this.http.put('api/teacher/' + teacher.id, teacher, {observe: 'response'}).pipe(
      catchError( err => {
        console.log(err);
        return throwError(err);
      })
    );
  }

  public newLesson(model: Lesson) {
    this.progressService.start();
    return this.http.post('api/lesson', model, {observe: 'response'}).pipe(
      tap(null, null, this.progressService.stop()),
    );
  }

  public getLessons(id: string) {
    this.progressService.start();
    return this.http.get<Lesson[]>('api/lesson/' +  id).pipe(
      tap(null, null, this.progressService.stop()),
      catchError( err => {
        console.log(err);
        this.progressService.stop();
        return throwError(err);
      })
    );
  }

}
