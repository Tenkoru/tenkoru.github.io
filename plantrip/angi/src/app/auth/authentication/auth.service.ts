import { Injectable } from "@angular/core";
import { Observable, of, from } from "rxjs";
import { tap, delay } from "rxjs/operators";
import { AngularFireAuth } from "@angular/fire/auth";
import * as firebase from "firebase/app";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  redirectUrl: string;

  socialNames = {
    facebook: "Facebook",
    google: "Google"
  };

  doFacebookLogin(): Observable<any> {
    return from(
      new Promise<any>((resolve, reject) => {
        let provider = new firebase.auth.FacebookAuthProvider();
        this.afAuth.auth.signInWithPopup(provider).then(
          res => {
            resolve(res);
          },
          err => {
            reject(err);
          }
        );
      })
    );
  }

  doGoogleLogin(): Observable<any> {
    return from(
      new Promise<any>((resolve, reject) => {
        let provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope("profile");
        provider.addScope("email");
        this.afAuth.auth.signInWithPopup(provider).then(res => {
          resolve(res);
        });
      })
    );
  }

  doLogout(): Observable<any> {
    return from(
      new Promise((resolve, reject) => {
        if (firebase.auth().currentUser) {
          this.afAuth.auth.signOut();
          resolve();
        } else {
          reject();
        }
      })
    );
  }

  constructor(public afAuth: AngularFireAuth) {}
}
