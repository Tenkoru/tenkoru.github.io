import { EventEmitter } from '@angular/core';
import { Component, OnInit, Input, Output } from '@angular/core';
import { Trip } from 'src/app/index/app.trip';
import { Place } from '../app.place';

@Component({
  selector: 'app-details-bottom',
  templateUrl: './details-bottom.component.html',
  styleUrls: ['./details-bottom.component.scss']
})
export class DetailsBottomComponent implements OnInit {

  @Input() props: Trip;
  @Input() isNotEditable: boolean;
  @Output() updatePlaceEmitter = new EventEmitter;

  detailsBottomTitle: string = "Подробный план моего путешествия:";

  updatePlaceHandler($event: Place[]) {
    this.updatePlaceEmitter.emit($event)
  }

  constructor() { }

  ngOnInit() {
  }

}
