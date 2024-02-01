import {Place} from "./place";

export interface Event {
  id: bigint;
  name: string;
  startTime: string;
  endTime: string;
  places: Place[];

}
