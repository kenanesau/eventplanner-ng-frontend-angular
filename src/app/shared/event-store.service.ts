import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Event} from "./event";

@Injectable({
  providedIn: 'root'
})
export class EventStoreService {
  private url = 'http://localhost:8080';
  constructor(private http: HttpClient) { }

  getAll(): Observable<Event[]> {
    return this.http.get<Event[]>( this.url + '/user/events/');
  }
}
