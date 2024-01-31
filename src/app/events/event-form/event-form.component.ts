import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DatePipe, NgIf} from '@angular/common';
import {Event} from "../shared/event";
import {Place} from "../shared/place";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {TimeSelectComponent} from "../time-select/time-select.component";

@Component({
  selector: 'ep-event-form',
  standalone: true,
  imports: [NgIf, DatePipe, FormsModule, ReactiveFormsModule, TimeSelectComponent],
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent {
  _event: Event = {
    id: -1n,
    name: '',
    startTime: new Date().toDateString(),
    endTime: new Date().toDateString(),
    places: [
      {
        name: '',
        locked: false,
        lockedComment: '',
      }
    ]
  }
  @Input()
  set event(event: Event) {
    this._event = {...event};
    this._event.places = new Array<Place>();
    event.places.forEach(
      place => this._event.places.push({...place})
    );
  }
  get event() { return this._event; }
  @Output() changedEvent = new EventEmitter<Event>();

  eventForm = new FormGroup({
    startTime: new FormControl( this.event.startTime.toString(), {
      nonNullable: true } ),
    endTime: new FormControl( this.event.endTime.toString(), {
      nonNullable: true }),
    name: new FormControl( this.event.name, {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.maxLength(255)
      ]
    }),
    places: new FormControl( this.event.places, { nonNullable: true} )
  });

  submitForm() {
    const newEvent: Event = {id: -1n, ...this.eventForm.getRawValue()};
    this.changedEvent.emit(newEvent);
  }


}
