import {Place} from "./place";

export interface Event {
  id: number;
  name: string;
  startTime: string|null;
  endTime: string|null;
  places: Place[];

}
