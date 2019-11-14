import { Injectable } from "@angular/core";
import * as moment from "moment";

@Injectable({
  providedIn: "root"
})
export class DateService {
  constructor() {}
  public parseDatesToTimestamp(dates: string[]): number[] {
    let parsedDates: number[] = [];

    if (dates[0]) {
      parsedDates[0] = +moment(dates[0], "DD/MM/YYYY").format('x');
    }
    if (dates[1]) {
      parsedDates[1] = +moment(dates[1], "DD/MM/YYYY").format('x');
    } else {
      parsedDates[1] = 0;
    }
    if (parsedDates[0] && parsedDates[1] && parsedDates[0] > parsedDates[1]) {
      const tmp = parsedDates[0];
      parsedDates[0] = parsedDates[1];
      parsedDates[1] = tmp;
    }

    return parsedDates;
  }
  public parseDateToTimestamp(date): number {
    let parsedDate: number;

    if (date) {
      parsedDate = +moment(date, "DD/MM/YYYY").format('x');
    } else {
      parsedDate = 0;
    }

    return parsedDate;
  }
  getParsedDate(date: number): string {
    let result = "";
    if (typeof date !== "undefined" && date) {
      result = moment(date).format("DD/MM/YYYY");
    }
    return result;
  }
  getParsedDates(dates: number[]): string {
    if (dates) {
      let date1 = dates[0];
      let date2 = dates[1];
      let result: string = "";

      if (date1 && date2 && date1 > date2) {
        const tmp = date1;
        date1 = date2;
        date2 = tmp;
      }

      if (date1) {
        result = moment(date1).format("DD/MM/YYYY");
      }

      if (date2) {
        result += ` - ${moment(date2).format("DD/MM/YYYY")}`;
      }
      return result;
    } else {
      return "Дата";
    }
  }
}
