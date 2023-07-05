import {Component, Input} from '@angular/core';
import {DatePipe, NgIf} from '@angular/common';
import {Event} from "../shared/event";
import {TimeSelectComponent} from "../time-select/time-select.component";

@Component({
  selector: 'ep-event',
  standalone: true,
  imports: [NgIf, DatePipe, TimeSelectComponent],
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent {
  @Input() event?: Event;
}
