import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {
  
  public inProgress: BehaviorSubject<boolean> = new BehaviorSubject(false);
  
  start(): any {
    this.inProgress.next(true);
  }

  stop(): any {
    this.inProgress.next(false);
  }
  constructor() { }


  public setProgress(value: boolean) {
    this.inProgress.next(value);
  }
}
