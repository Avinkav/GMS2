import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {

  constructor() { }

  public inProgress: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public setProgress(value: boolean) {
    this.inProgress.next(value);
  }
}
