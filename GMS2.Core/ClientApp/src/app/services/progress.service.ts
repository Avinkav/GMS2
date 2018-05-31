import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {

  public inProgress: EventEmitter<boolean> = new EventEmitter();

  public start() {
    this.inProgress.next(true);
  }

  public stop() {
    this.inProgress.next(false);
  }
  constructor() { }

  // DEPRECATED: use start and stop
  public setProgress(value: boolean) {
    this.inProgress.next(value);
  }
}
