import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DatePipe, NgIf} from '@angular/common';
import {Event} from "../shared/event";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TimeSelectComponent} from "../time-select/time-select.component";

@Component({
  selector: 'ep-event-form',
  standalone: true,
  imports: [NgIf, DatePipe, FormsModule, ReactiveFormsModule, TimeSelectComponent],
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent {
  @Input() event?: Event;
  @Output() changedEvent = new EventEmitter<Event>();

  eventDateRange = new FormGroup({
    start: new FormControl(new Date(this.event?.startTime?this.event.startTime:new Date())),
    end: new FormControl(new Date(this.event?.endTime?this.event.endTime:new Date())),
  });
}
