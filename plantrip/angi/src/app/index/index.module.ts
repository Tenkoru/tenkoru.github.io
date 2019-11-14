import { FriendsModule } from './friends/friends.module';
import { AppRoutingModule } from './../app-routing.module';
import { DetailsListComponent } from './details/details-bottom/details-list/details-list.component';
import { DashboardModule } from "./dashboard/dashboard.module";
import { SharedModule } from "./../shared/shared.module";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { FooterComponent } from "./footer/footer.component";
import { AngularSvgIconModule } from "angular-svg-icon";
import { HeaderBurgerComponent } from "./header/header-top/header-burger/header-burger.component";
import { HeaderBottomComponent } from "./header/header-bottom/header-bottom.component";
import { HeaderTopComponent } from "./header/header-top/header-top.component";
import { HeaderComponent } from "./header/header.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IndexComponent } from "./index.component";
import { SidebarNavigationComponent } from "./sidebar/sidebar-navigation/sidebar-navigation.component";
import { SidebarBottomComponent } from "./sidebar/sidebar-bottom/sidebar-bottom.component";
import { SidebarNewComponent } from "./sidebar/sidebar-new/sidebar-new.component";
import { DetailsComponent } from './details/details.component';
import { DetailsMainComponent } from './details/details-main/details-main.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailsSearchComponent } from './details/details-bottom/details-search/details-search.component';
import { DetailsBottomComponent } from './details/details-bottom/details-bottom.component';
import { DpDatePickerModule } from 'ng2-date-picker';
import { NgxMaskModule } from 'ngx-mask';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireStorageModule } from 'angularfire2/storage';

@NgModule({
  imports: [
    CommonModule,
    AngularSvgIconModule,
    SharedModule,
    DashboardModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FriendsModule,
    DpDatePickerModule,
    NgxMaskModule.forRoot(),
    NgbModalModule,
    AngularFireStorageModule,
  ],
  declarations: [
    IndexComponent,
    HeaderComponent,
    HeaderTopComponent,
    HeaderBottomComponent,
    HeaderBurgerComponent,
    FooterComponent,
    SidebarComponent,
    SidebarNavigationComponent,
    SidebarBottomComponent,
    SidebarNewComponent,
    DetailsComponent,
    DetailsMainComponent,
    DetailsSearchComponent,
    DetailsListComponent,
    DetailsBottomComponent,
  ]
})
export class IndexModule {}
