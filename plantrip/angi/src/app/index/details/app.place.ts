import { Region } from "./app.region";

export interface Place {
  name: string;
  date?: number[];
  regions?: Region[];
  type: "country";
}
