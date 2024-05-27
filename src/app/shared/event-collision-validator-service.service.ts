import { Injectable } from '@angular/core';
import {EventStoreService} from "./event-store.service";
import {AbstractControl, AsyncValidatorFn, FormGroup, ValidatorFn} from "@angular/forms";
import {Event} from "./event";
import {map, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EventCollisionValidatorServiceService {

  constructor(private eventService : EventStoreService) {  }

  timeFrameAvailableValidator(): AsyncValidatorFn {
   return (formGroup: AbstractControl) => {
     const startTime = formGroup.get('startTime')?.value;
     const endTime = formGroup.get('endTime')?.value;
     const places = formGroup.get('places')?.value;

     if ((startTime!=null || endTime != null) && places != null) {
       const event : Event = {id: -1, name: 'cd', startTime: startTime, endTime: endTime, places: places};
       return this.eventService.getEventCollissions(event).pipe(
         map((events :Event[]) => {
           if (events==null) {
             return null;
           } else {
             return { collidingEvents: events }
           }
       })
       );
     } else {
       return of(null);
     }
   }
  }
}
