import { Component } from '@angular/core';
import {CommonModule, NgFor} from '@angular/common';
import {EventComponent} from "../event/event.component";
import {Event} from "../shared/event";
import {EventStoreService} from "../shared/event-store.service";

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
    this.evService.getAll().subscribe(
      (events) => this.events=events
    );

  }

}
