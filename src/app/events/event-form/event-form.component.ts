import {Component, EventEmitter, Inject, Input, LOCALE_ID, Output} from '@angular/core';
import {
  AsyncPipe,
  DatePipe,
  FormatWidth,
  getLocaleDateTimeFormat,
  JsonPipe,
  NgForOf,
  NgIf
} from '@angular/common';
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
  imports: [NgIf, DatePipe, FormsModule, ReactiveFormsModule, TimeSelectComponent, NgForOf, AsyncPipe, JsonPipe],
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent {
  _event?: Event;
  availablePlaces$: Observable<Place[]>;
  selectedPlaces: number[] = [];

  @Inject(LOCALE_ID) public locale: string;

  constructor(private fb: FormBuilder, private placeService: PlaceStoreService, @Inject(LOCALE_ID) locale: string) {
    this.locale = locale;
    this.availablePlaces$ = this.placeService.getAll();
  }
  @Input()
  set event(event :Event) {
    this._event = {...event};

    let start = null;
    let end = null;

    if (this.event!=null) {
      if (this.event.startTime!=null) start = this.event.startTime.slice(0, -13);
      if (this.event.endTime!=null) end = this.event.endTime.slice(0, -13);
    }
    this.eventForm = this.fb.group({
      startTime: new FormControl(start, {nonNullable: true}),
      endTime: new FormControl(end, {nonNullable: true}),
      name: new FormControl(this.event?.name, {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.maxLength(255)
        ]
      }),
      places: this.fb.array([])
    });

    if (event.places != null) {
      event.places.forEach(
        place => {
          this._addPlace(place)
        });
    }
  }
  get event(): Event|undefined { return this._event; }
  @Output() changedEvent = new EventEmitter<Event>();
  eventForm :FormGroup = this.fb.group({
    places: this.fb.array([])
  });

  get places(): FormArray<FormGroup> {
    return this.eventForm.controls["places"] as FormArray;
  }

  _addPlace(place :Place|undefined) {
    const placeForm: FormGroup = this.fb.group({
      placeId: [place == undefined ? '' : place.id, Validators.required]
    });

    if (place !== undefined) {
      this.selectedPlaces.push(place?.id);
    }

    this.places.push(placeForm as FormGroup);
  }

  addPlace() {
    this._addPlace(undefined);
  }

  deletePlace(placeIndex: number) {
    this.places.removeAt(placeIndex);
    this.selectedPlaces[placeIndex]=-1;
  }

  submitForm() {
    const bookedPlaces: Place[] = [];

    this.availablePlaces$.subscribe(
      allPlaces => {
        this.places.controls.forEach(
          value => {
            if (typeof value === 'object' && value!==undefined) {
              const placeId: number = Number(value.get("placeId")?.value);
              const place: Place|undefined = allPlaces.filter( place => place.id === placeId ).pop()
              if (typeof place !== 'undefined') {
                bookedPlaces.push(place)
              }
              const id: number = this.event?.id??-1;
              const newEvent :Event = {id, ...this.eventForm.getRawValue(), places: bookedPlaces};
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
