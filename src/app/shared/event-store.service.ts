import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Event} from "./event";
import {API_URL} from  "../../tokens";

@Injectable({
  providedIn: 'root'
})
export class EventStoreService {
  constructor(private http: HttpClient, @Inject(API_URL) private url: string ) { }

  getAll(): Observable<Event[]> {
    return this.http.get<Event[]>( this.url + '/user/events/');
  }

  getEvent(id: bigint): Observable<Event> {
    return this.http.get<Event>( this.url + '/user/events' + id);
  }

  create(ev: Event): Observable<Event> {
    return this.http.post<Event>(this.url + '/user/events/create', ev);
  }

  getEventCollissions(ev: Event): Observable<Event[]> {
    return this.http.post<Event[]>( this.url + '/user/events/checkcollisions', ev);
  }
}
