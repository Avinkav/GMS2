import { Component, OnInit } from '@angular/core';
import { ProgressService } from '../services/progress.service';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit {

  constructor(private progressService: ProgressService) { }

  progress;

  ngOnInit() {
    this.progressService.inProgress.subscribe(next => this.progress = next);
  }

}
