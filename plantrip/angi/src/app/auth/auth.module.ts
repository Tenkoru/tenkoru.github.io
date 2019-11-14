import { AuthLinksComponent } from "./auth-links/auth-links.component";
import { AuthTitleComponent } from "./auth-title/auth-title.component";
import { LoginSocialComponent } from "./login-social/login-social.component";
import { LoginDividerComponent } from "./login-divider/login-divider.component";
import { SharedModule } from "./../shared/shared.module";
import { LoginComponent } from "./login/login.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthComponent } from "./auth.component";
import { AngularSvgIconModule } from "angular-svg-icon";
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AngularSvgIconModule,
    AppRoutingModule,
  ],
  declarations: [
    AuthComponent,
    LoginComponent,
    // RegisterComponent,
    // ResetComponent,
    LoginDividerComponent,
    LoginSocialComponent,
    AuthTitleComponent,
    AuthLinksComponent,
  ],
  exports: [AuthComponent]
})
export class AuthModule {}
