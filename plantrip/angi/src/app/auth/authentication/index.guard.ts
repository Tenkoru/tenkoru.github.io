import { AuthService } from "./auth.service";
import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { Observable, from } from "rxjs";
import { AngularFireAuth } from "@angular/fire/auth";
import { UserService } from "../../shared/user/user.service";

@Injectable({
  providedIn: "root"
})
export class IndexGuard implements CanActivate {
  constructor(
    public afAuth: AngularFireAuth,
    public userService: UserService,
    private router: Router
  ) {}

  canActivate(): Observable<any> {
    return from(
      new Promise((resolve, reject) => {
        this.userService.getCurrentUser().subscribe(
          user => {
            return resolve(true);
          },
          err => {
            this.router.navigate(["/auth"]);
            return resolve(false);
          }
        );
      })
    );
  }
}
