import {Component, Input, Output} from '@angular/core';
import {DatePipe, NgIf} from '@angular/common';
import {Event} from "../shared/event";
import {MatCardModule} from "@angular/material/card";

@Component({
  selector: 'app-event',
  standalone: true,
    imports: [MatCardModule, NgIf, DatePipe],
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent {
  @Input() event?: Event;

}
