import { FilterArguments } from "./filterArguments";
import { Trip } from "src/app/index/app.trip";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class DashboardFilterService {
  constructor() {}
  filterTrips(trips: Trip[], filterString: string): Trip[] {
    let filteredTrips: Trip[] = [];
    const regExp = new RegExp(filterString, "i");
    trips.forEach(trip => {
      if (trip.title.match(regExp)) {
        filteredTrips.push(trip);
      } else {
        if (typeof trip.places !== "undefined") {
          trip.places.forEach(place => {
            if (typeof place.regions !== "undefined") {
              place.regions.forEach(region => {
                if (typeof region.locations !== "undefined") {
                  region.locations.forEach(location => {
                    if (location.name.match(regExp)) {
                      filteredTrips.push(trip);
                    }
                  });
                }
              });
            }
          });
        }
      }
    });
    return filteredTrips;
  }
  sortTrips(trips: Trip[], sortType: string, isAscending: boolean): Trip[] {
    let sortedTrip: Trip[];
    let isSortAscending = -1;

    if (isAscending) {
      isSortAscending = -isSortAscending;
    }

    sortedTrip = trips.sort((a: Trip, b: Trip) => {
      if (a[sortType] < b[sortType]) {
        return -isSortAscending;
      }
      if (a[sortType] > b[sortType]) {
        return isSortAscending;
      }
      return 0;
    });
    return sortedTrip;
  }
  filterAndSortTrips(trips: Trip[], filterArguments: FilterArguments): Trip[] {
    let filteredTrips: Trip[] = [];
    filteredTrips = this.filterTrips(trips, filterArguments.searchFilterString);
    filteredTrips = this.sortTrips(
      filteredTrips,
      filterArguments.sortType,
      filterArguments.sortDirectionAscending
    );

    return filteredTrips;
  }
}
