import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProgressService } from './progress.service';
import { tap } from 'rxjs/operators';
import { Teacher } from '../models/teacher';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient, private progressService: ProgressService) {
  }

  public getTeachers() {
    this.progressService.start();
    return this.http.get<Teacher[]>('api/teacher/list/10').pipe(
      tap(null, null, this.progressService.stop()),
    );
  }
}
