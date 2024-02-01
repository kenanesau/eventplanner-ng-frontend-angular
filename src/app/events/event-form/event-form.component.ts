import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AsyncPipe, DatePipe, NgForOf, NgIf} from '@angular/common';
import {Event} from "../../shared/event";
import {Place} from "../../shared/place";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {TimeSelectComponent} from "../time-select/time-select.component";
import {PlaceStoreService} from "../../shared/place-store.service";
import {Observable} from "rxjs";

@Component({
  selector: 'ep-event-form',
  standalone: true,
  imports: [NgIf, DatePipe, FormsModule, ReactiveFormsModule, TimeSelectComponent, NgForOf, AsyncPipe],
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
        id: -1n,
        name: '',
        locked: false,
        lockedComment: '',
      }
    ]
  }
  availablePlaces$: Observable<Place[]>;

  constructor(private fb: FormBuilder, private placeService: PlaceStoreService) {
    this.availablePlaces$ = this.placeService.getAll();
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

  eventForm = this.fb.group({
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
    places: this.fb.array([])
  });

  get places(): FormArray {
    return this.eventForm.controls["places"] as FormArray;
  }

  addPlace() {
    const placeForm = this.fb.group({
      name: ['', Validators.required]
    });

    this.places.push(placeForm);
  }

  deletePlace(placeIndex: number) {
    this.places.removeAt(placeIndex);
  }

  submitForm() {
    /*const newEvent: Event = {id: -1n, ...this.eventForm.getRawValue()};
    this.changedEvent.emit(newEvent);**/
  }


}
