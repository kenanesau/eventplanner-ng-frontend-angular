import {Component, Input, Output} from '@angular/core';
import {DatePipe, NgIf} from '@angular/common';
import {Event} from "../shared/event";
import {MatCardModule} from "@angular/material/card";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-event',
  standalone: true,
  imports: [MatCardModule, NgIf, DatePipe, MatDatepickerModule, MatNativeDateModule],
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent {
  @Input() event?: Event;

  eventDateRange = new FormGroup({
    start: new FormControl(this.event.range?.start),
    end: new FormControl(this.event.range?.end),
  });
}
