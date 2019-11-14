import { Location } from "./app.location";
export interface Region {
  name: string;
  date?: number[];
  locations?: Location[];
  type: "region";
}
