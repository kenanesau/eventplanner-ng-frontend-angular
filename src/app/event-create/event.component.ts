import {Component, Input, Output} from '@angular/core';
import {DatePipe, NgIf} from '@angular/common';
import {Event} from "../shared/event";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TimeSelectComponent} from "../time-select/time-select.component";

@Component({
  selector: 'app-event-create',
  standalone: true,
  imports: [NgIf, DatePipe, FormsModule, ReactiveFormsModule, TimeSelectComponent],
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent {
  @Input() event?: Event;

  eventDateRange = new FormGroup({
    start: new FormControl(new Date(this.event?.startTime?this.event.startTime:new Date())),
    end: new FormControl(new Date(this.event?.endTime?this.event.endTime:new Date())),
  });
}
