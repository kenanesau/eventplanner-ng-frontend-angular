import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Event} from "./event";
import {API_URL} from "../../tokens";

@Injectable({
  providedIn: 'root'
})
export class EventStoreService {
    constructor(private http: HttpClient, @Inject(API_URL) private url: string ) { }

  getAll(): Observable<Event[]> {
    return this.http.get<Event[]>( this.url + '/user/events/');
  }
}
