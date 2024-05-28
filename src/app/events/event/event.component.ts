import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DatePipe, NgIf} from '@angular/common';
import {Event} from "../../shared/event";
import {TimeSelectComponent} from "../time-select/time-select.component";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'ep-event',
  standalone: true,
  imports: [NgIf, DatePipe, TimeSelectComponent, RouterLink],
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent {
  @Input() event?: Event;
  @Output() editEvent = new EventEmitter<Event>();

  doEditEvent() {
    this.editEvent.emit(this.event);
  }
}
