import {Place} from "./place";
import {DateRange} from "@angular/material/datepicker";

export interface Event {
  name: string;
  startTime: string;
  endTime: string;
  places: Place[];

  range: DateRange<Date> | null;
}
