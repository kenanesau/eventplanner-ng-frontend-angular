import {Place} from "./place";

export interface Event {
  name: string;
  startTime: string;
  endTime: string;
  places: Place[];

}
