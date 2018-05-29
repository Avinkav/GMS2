import { Component, OnInit, Input } from '@angular/core';
import { CalendarEvent } from 'calendar-utils';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  view = 'month';
  viewDate = new Date();
  events: CalendarEvent[];

  @Input() id: string;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    if (!this.id)
      return;
    this.dataService.getLessons(this.id).subscribe(
      res => {
        this.events = res.map(l => ({
            start: new Date(l.date),
            end: this.getEndDate(new Date(l.date), l.duration),
            title: l.teacher.name
          })
        );
      });
  }

  getEndDate(date: Date, dur: number) {
    return new Date(date.getTime() + dur * 60000);
  }

}
