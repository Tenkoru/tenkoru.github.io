import { take, map, tap } from "rxjs/operators";
import { FormGroup } from "@angular/forms";
import { Trip } from "../../index/app.trip";
import { AngularFirestore, Action, DocumentData } from "@angular/fire/firestore";
import { Injectable } from "@angular/core";
import { Observable, Subscriber } from "rxjs";
import { firestore } from "firebase";
import { DateService } from "../services/date.service";

@Injectable({
  providedIn: "root"
})
export class DatabaseService {
  constructor(private db: AngularFirestore, private dateService: DateService) {}

  getUserData(userId: string): Observable<Action<firestore.DocumentSnapshot>> {
    return this.db
      .collection("users")
      .doc(userId)
      .snapshotChanges();
  }
  updateTripsData(userId: string, trips: object): Observable<Promise<void>> {
    return new Observable(subscriber => {
      subscriber.next(
        this.db
          .collection("users")
          .doc(userId)
          .update(trips)
      );
      subscriber.complete();
    });
  }
  updateFriendsData(userId: string, friends: object): Observable<Promise<void>> {
    return new Observable(subscriber => {
      subscriber.next(
        this.db
          .collection("users")
          .doc(userId)
          .update(friends)
      );
      subscriber.complete();
    });
  }
  createUserData(userId: string): void {
    this.db
      .collection("users")
      .doc(userId)
      .get()
      .subscribe(documentInfo => {
        if (!documentInfo.exists) {
          let newUserData = {
            trips: [],
            friends: {
              accepted: [],
              unaccepted: []
            }
          };
          this.db
            .collection("users")
            .doc(userId)
            .set(newUserData);
        }
      });
  }
  tryCreateNewUser(userData: any): void {
    if (userData.additionalUserInfo.isNewUser) {
      this.createUserData(userData.user.email);
    }
  }
  generateId(trips: DocumentData): number {
    let maxId = 0;
    trips.trips.forEach(element => {
      if (element.id && element.id > maxId) {
        maxId = element.id;
      }
    });
    return maxId + 1;
  }
  createNewTrip(userId: string, formData: FormGroup): Observable<number> {
    return new Observable(subscriber => {
      const formDataValues = formData.value;
      this.db
        .collection("users")
        .doc(userId)
        .get()
        .pipe(
          take(1),
          tap(data => {
            let trips = data.data();
            const tripId = this.generateId(trips);
            let newTrip: Trip;
            const dateArr = []
            dateArr[0] = formDataValues.dateStart;
            dateArr[1] = formDataValues.dateEnd;
            newTrip = {
              id: tripId,
              title: formDataValues.title,
              date: this.dateService.parseDatesToTimestamp(dateArr),
              description: formDataValues.description,
              mainImg: "assets/images/tripDefault.jpg",
              type: "future",
              rating: 0
            };
            trips.trips.push(newTrip);
            this.updateTripsData(userId, trips).subscribe(() => {
              subscriber.next(tripId);
            });
          })
        )
        .subscribe();
    });
  }
}
