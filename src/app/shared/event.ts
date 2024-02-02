import {Place} from "./place";

export interface Event {
  id: number;
  name: string;
  startTime: string;
  endTime: string;
  places: Place[];

}
