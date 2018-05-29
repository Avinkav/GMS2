import { Component, OnInit } from '@angular/core';
import { MockdataService } from '../../services/mockdata.service';
import { Instrument } from '../../models/instrument';



@Component({
  selector: 'app-instruments',
  templateUrl: './instruments.component.html',
  styleUrls: ['./instruments.component.css']
})
export class InstrumentsComponent implements OnInit {

  burrowedInstruments: Instrument[];
  searchString = '';
  instruments: Instrument[];


  constructor(private dataService: MockdataService) { }

  ngOnInit() {
    this.dataService.getInstruments().subscribe(value => this.instruments = value);
    this.dataService.getBorrowedInstruments().subscribe(value => this.burrowedInstruments = value);
  }

}
