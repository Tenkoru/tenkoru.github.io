import { Router, ActivatedRoute } from "@angular/router";
import { DatabaseService } from "src/app/shared/database/database.service";
import { UserService } from "../../shared/user/user.service";
import { HttpClient } from "@angular/common/http";
import { Location } from "./app.location";
import { Injectable } from "@angular/core";
import * as moment from "moment";
import { Place } from "./app.place";
import { Region } from "./app.region";
import { Observable } from "rxjs";
import { Trip } from "src/app/index/app.trip";

@Injectable({
  providedIn: "root"
})
export class DetailsService {
  constructor(
    private http: HttpClient,
    private userService: UserService,
    private databaseService: DatabaseService
  ) {}
  updatePlaceData(updatedTrips: Trip[]) {
    this.userService.getCurrentUser().subscribe(user => {
      this.databaseService.updateTripsData(user.email, { trips: updatedTrips }).subscribe();
    });
  }
  sendTripsData(updatedTrips: Trip[], router: Router) {
    this.userService.getCurrentUser().subscribe(user => {
      this.databaseService.updateTripsData(user.email, { trips: updatedTrips }).subscribe(() => {
        router.navigateByUrl("/dashboard");
      });
    });
  }
  getWiki(title: string): Observable<any> {
    const tempTitle = title.replace(" ", "%20");
    const baseUrl = `https://ru.wikipedia.org/w/api.php?action=query&origin=*&format=json&prop=extracts&exintro&explaintext&redirects=1&titles=${tempTitle}`;
    return this.http.get<any>(baseUrl);
  }
  searchForPlaceByName(placeList: Place[], placeName: string) {
    let result: object;
    placeList.find(country => {
      if (country.name === placeName) {
        result = country;
      } else {
        if (typeof country.regions != "undefined") {
          country.regions.find(region => {
            if (region.name === placeName) {
              result = region;
            } else {
              if (typeof region.locations != "undefined") {
                region.locations.find(location => {
                  if (location.name === placeName) {
                    result = location;
                  }
                });
              }
            }
          });
        }
      }
    });
    return result;
  }
  isAtFriendDetails(router: ActivatedRoute): boolean {
    return router.snapshot.url[router.snapshot.url.length - 2].path !== "details";
  }
  getEmailFromRoute(router: ActivatedRoute): string {
    return router.snapshot.url[router.snapshot.url.length - 2].path;
  }

  addNewPlace(placeList: Place[], newPlaceData: google.maps.places.PlaceResult): Observable<any> {
    return new Observable(subscriber => {
      if (!newPlaceData.address_components) {
        return;
      }
      let newPlaceList = placeList;
      let isNoLocation = false;
      const addressComponents = newPlaceData.address_components;
      const countryName = findType("country");
      let regionName = findType("locality");
      let locationName = newPlaceData.name;
      const placeName = newPlaceData.name;
      let newPlace: Place;
      let newRegion: Region;
      let newLocation: Location;
      let locationDescription: string;

      function findType(stringToFind: string) {
        let result = "";
        addressComponents.forEach((component, id) => {
          component.types.forEach(type => {
            if (type === stringToFind) {
              result = component.long_name;
            }
          });
        });
        return result;
      }

      this.getWiki(placeName).subscribe(response => {
        const key = Object.keys(response.query.pages)[0];
        locationDescription = response.query.pages[key].extract;
        if (typeof locationDescription === "undefined") {
          locationDescription = "Описание";
        }

        if (regionName === placeName || countryName === placeName) {
          isNoLocation = true;
        }

        if (!regionName) {
          regionName = findType("administrative_area_level_1");
          if (!regionName) {
            regionName = findType("administrative_area_level_3");
          }
        }

        newPlace = {
          name: countryName,
          type: "country",
          regions: []
        };

        if (regionName) {
          newRegion = {
            name: regionName,
            type: "region",
            locations: []
          };
          newPlace.regions.push(newRegion);
        }

        if (!isNoLocation) {
          newLocation = {
            name: locationName,
            type: "location",
            description: locationDescription
          };
          if (typeof newRegion.locations === undefined) {
            newRegion.locations = [];
          }
          newRegion.locations.push(newLocation);
        }

        if (newPlaceList === undefined || !newPlaceList.length) {
          newPlaceList = [];
          newPlaceList.push(newPlace);
        } else {
          //FilterHell
          let isNewCountry = true;
          for (let i = 0; i < newPlaceList.length; i++) {
            if (newPlaceList[i].name === countryName) {
              isNewCountry = false;
              if (newPlaceList[i].regions) {
                let isNewRegion = true;
                for (let j = 0; j < newPlaceList[i].regions.length; j++) {
                  if (newPlaceList[i].regions[j].name === regionName) {
                    isNewRegion = false;
                    if (newPlaceList[i].regions[j].locations && !isNoLocation) {
                      if (newPlaceList[i].regions[j].locations.length === 0) {
                        newPlaceList[i].regions[j].locations.push(newLocation);
                      } else {
                        for (let k = 0; k < newPlaceList[i].regions[j].locations.length; k++) {
                          if (newPlaceList[i].regions[j].locations[k].name === locationName) {
                            isNoLocation = true;
                            return newPlaceList;
                          }
                        }
                        if (!isNoLocation) {
                          newPlaceList[i].regions[j].locations.push(newLocation);
                        }
                      }
                    }
                  }
                }
                if (isNewRegion) {
                  newPlaceList[i].regions.push(newRegion);
                }
              } else {
                newPlaceList[i].regions = [];
                newPlaceList[i].regions.push(newRegion);
              }
            }
          }
          if (isNewCountry) {
            newPlaceList.push(newPlace);
          }
        }
        subscriber.next(newPlaceList);
      });
    });
  }
  deletePlaceFromList(placeList: Place[], placeToDelete: any): Place[] {
    for (let i = 0; i < placeList.length; i++) {
      if (placeList[i] === placeToDelete) {
        placeList.splice(i, 1);
        break;
      } else {
        if (typeof placeList[i].regions != "undefined") {
          for (let j = 0; j < placeList[i].regions.length; j++) {
            if (placeList[i].regions[j] === placeToDelete) {
              placeList[i].regions.splice(j, 1);
              break;
            } else {
              if (typeof placeList[i].regions[j].locations != "undefined") {
                for (let k = 0; k < placeList[i].regions[j].locations.length; k++) {
                  if (placeList[i].regions[j].locations[k] === placeToDelete) {
                    placeList[i].regions[j].locations.splice(k, 1);
                    break;
                  }
                }
              }
            }
          }
        }
      }
    }
    return placeList;
  }
  updateLocationDescription(placeList: Place[], Location: Location, description: string): Place[] {
    for (let i = 0; i < placeList.length; i++) {
      if (typeof placeList[i].regions != "undefined") {
        for (let j = 0; j < placeList[i].regions.length; j++) {
          if (typeof placeList[i].regions[j].locations != "undefined") {
            for (let k = 0; k < placeList[i].regions[j].locations.length; k++) {
              if (placeList[i].regions[j].locations[k] === Location) {
                placeList[i].regions[j].locations[k].description = description;
                break;
              }
            }
          }
        }
      }
    }
    return placeList;
  }
}
