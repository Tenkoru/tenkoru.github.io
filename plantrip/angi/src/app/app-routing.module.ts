import { IndexGuard } from "./auth/authentication/index.guard";
import { LoginComponent } from "./auth/login/login.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";
import { IndexComponent } from "./index/index.component";
import { AuthGuard } from "./auth/authentication/auth.guard";
import { DashboardComponent } from "./index/dashboard/dashboard.component";
import { DetailsComponent } from "./index/details/details.component";
import { FriendsComponent } from "./index/friends/friends.component";

const routes: Routes = [
  { path: "", redirectTo: "index", pathMatch: "full" },
  {
    path: "auth",
    component: AuthComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "login",
        component: LoginComponent
      },
      // {
      //   path: "register",
      //   component: RegisterComponent
      // },
      // {
      //   path: "reset",
      //   component: ResetComponent
      // },
      {
        path: "",
        redirectTo: "login",
        pathMatch: "full"
      }
    ]
  },
  {
    path: "index",
    component: IndexComponent,
    canActivate: [IndexGuard],
    children: [
      { path: "dashboard", component: DashboardComponent },
      {
        path: "details/:id",
        component: DetailsComponent
      },
      {
        path: "friends/dashboard/:id",
        component: DashboardComponent
      },
      {
        path: "friends/details/:id/:id",
        component: DetailsComponent
      },
      {
        path: "friends",
        component: FriendsComponent
      },
      { path: "", redirectTo: "dashboard", pathMatch: "full" }
    ]
  },
  { path: "**", redirectTo: "index", pathMatch: "full" }
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule {}
