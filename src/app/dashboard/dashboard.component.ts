import { Component } from '@angular/core';
import {CommonModule, NgFor} from '@angular/common';
import {EventComponent} from "../event-create/event.component";
import {Event} from "../shared/event";
import {EventStoreService} from "../shared/event-store.service";
import {
  from,
  map,
  switchMap,
  toArray,
} from "rxjs";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, EventComponent, NgFor],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent {
  events: Event[] = [];

  constructor(private evService: EventStoreService) {

    this.evService.getAll()
      .pipe(
        switchMap( evAr => from(evAr)),
        map(ev => {
          //ev.range = new DateRange<Date>(new Date(ev.startTime), new Date(ev.endTime))
          return ev;
        }),
        toArray()
     ).subscribe(
      (events) => this.events=events
    );

  }

}
