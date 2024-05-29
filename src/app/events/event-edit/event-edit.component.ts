import { Component } from '@angular/core';
import {EventStoreService} from "../../shared/event-store.service";
import {ActivatedRoute, Router} from "@angular/router";
import {map, Observable, switchMap} from "rxjs";
import {Event} from "../../shared/event";
import {EventFormComponent} from "../event-form/event-form.component";
import {AsyncPipe, NgIf} from "@angular/common";

@Component({
  selector: 'app-event-edit',
  standalone: true,
  imports: [
    EventFormComponent,
    AsyncPipe,
    NgIf
  ],
  templateUrl: './event-edit.component.html',
  styleUrl: './event-edit.component.scss'
})
export class EventEditComponent {
  event$: Observable<Event>;
  constructor(private route: ActivatedRoute, private router: Router, private evService: EventStoreService) {

    this.event$ = this.route.paramMap.pipe(
      map(params => params.get('id')!),
      switchMap(id => this.evService.getEvent(BigInt(id)))
    );
  }

  doEditEvent(event: Event) {
    this.evService.edit(event).subscribe(
      ev => this.router.navigate(['/events'])
    )
  }
}
