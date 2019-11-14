import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireAuth } from "@angular/fire/auth";
import * as firebase from "firebase/app";
import { Observable, from, of } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(public db: AngularFirestore, public afAuth: AngularFireAuth) {}

  getCurrentUser(): Observable<any> {
    return from(
      new Promise<any>((resolve, reject) => {
        let user = firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            resolve(user);
          } else {
            reject("No user logged in");
          }
        });
      })
    );
  }
  updateCurrentUser(value): Observable<any> {
    return from(
      new Promise<any>((resolve, reject) => {
        let user = firebase.auth().currentUser;
        user
          .updateProfile({
            displayName: value.name,
            photoURL: user.photoURL
          })
          .then(
            res => {
              resolve(res);
            },
            err => reject(err)
          );
      })
    );
  }
}
