import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {AsyncPipe, DatePipe, JsonPipe, NgForOf, NgIf} from '@angular/common';
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
import {map, Observable, switchMap} from "rxjs";

@Component({
  selector: 'ep-event-form',
  standalone: true,
  imports: [NgIf, DatePipe, FormsModule, ReactiveFormsModule, TimeSelectComponent, NgForOf, AsyncPipe, JsonPipe],
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent {
  _event: Event = {
    id: -1,
    name: '',
    startTime: new Date().toDateString(),
    endTime: new Date().toDateString(),
    places: [
      {
        id: -1,
        name: '',
        locked: false,
        lockedComment: '',
      }
    ]
  }
  availablePlaces$: Observable<Place[]>;
  selectedPlaces: number[] = [];

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
    startTime: new FormControl( this.event.startTime?.toString()??null, {
      nonNullable: true } ),
    endTime: new FormControl( this.event.endTime?.toString()??null, {
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

  get places(): FormArray<FormGroup> {
    return this.eventForm.controls["places"] as FormArray;
  }

  addPlace() {
    const placeForm:FormGroup = this.fb.group({
      placeId: ['', Validators.required]
    });

    this.places.push(placeForm as FormGroup);
  }

  deletePlace(placeIndex: number) {
    this.places.removeAt(placeIndex);
    this.selectedPlaces[placeIndex]=-1;
  }

  submitForm() {
    const bookedPlaces: Place[] = [];

    this.availablePlaces$.subscribe(
      allPlaces => {
        this.eventForm.controls.places.controls.forEach(
          value => {
            if (typeof value === 'object' && value!==undefined) {
              const id: number = Number(value.get("placeId")?.value);
              const place: Place|undefined = allPlaces.filter( place => place.id === id ).pop()
              if (typeof place !== 'undefined') {
                bookedPlaces.push(place)
              }
              const newEvent: Event = {id: -1, ...this.eventForm.getRawValue(), places: bookedPlaces};
              this.changedEvent.emit(newEvent);
            }
          }
        )
      }
    );
  }

  isUnavailablePlace(id: number): boolean {
    let selected = this.selectedPlaces.includes(id);
    if (selected)
      console.log(selected + ' Place ID=' + id + ' already selected! ' + this.selectedPlaces);
    return selected;
  }

  onSelect(event: any, i:number) {
    this.selectedPlaces[i]=Number(event.target.value);
  }
}
