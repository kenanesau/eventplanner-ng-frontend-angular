import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {API_URL} from "../../tokens";
import {Place} from "./place";

@Injectable({
  providedIn: 'root'
})
export class PlaceStoreService {
  constructor(private http: HttpClient, @Inject(API_URL) private url: string ) { }

  getAll(): Observable<Place[]> {
    return this.http.get<Place[]>( this.url + '/places/');
  }
}
