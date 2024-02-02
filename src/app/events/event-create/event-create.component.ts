import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EventFormComponent} from "../event-form/event-form.component";
import {EventStoreService} from "../../shared/event-store.service";
import {Router} from "@angular/router";
import {Event} from "../../shared/event"

@Component({
  selector: 'ep-event-create',
  standalone: true,
  imports: [CommonModule, EventFormComponent],
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.scss']
})
export class EventCreateComponent {
  constructor(private evService: EventStoreService, private router: Router) {}

  doCreateEvent(changedEvent: Event) {
    this.evService.create(changedEvent).subscribe(
      createdEvent => this.router.navigate(['/events']))
  }
}
