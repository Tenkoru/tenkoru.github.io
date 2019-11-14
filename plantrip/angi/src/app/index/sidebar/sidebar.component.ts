import { UserService } from "../../shared/user/user.service";
import { SidebarService } from "./sidebar.service";
import { Component, OnInit } from "@angular/core";
import { DashboardService } from "src/app/shared/services/dashboard.service";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"]
})
export class SidebarComponent implements OnInit {
  backArrowProps = {
    className: "sidebar__arrow",
    link: "javascript:void(0)",
    isButton: true
  };
  userName: string;
  closeButtonImg: string = "assets/icons/closeIcon.svg";

  isNavHidden: boolean = false;
  isNewHidden: boolean = true;

  userAvatar: string = "assets/icons/profile.svg";

  closeSidebar() {
    this.sidebarService.setSidebarStatus(false);
  }
  closeCreateNewMenu() {
    this.isNavHidden = false;
    this.isNewHidden = true;
  }
  openCreateNewMenu() {
    this.isNavHidden = true;
    this.isNewHidden = false;
  }
  getUserName() {
    this.userService.getCurrentUser().subscribe(user => {
      this.userName = user.displayName;
    });
  }
  getUserAvatar() {
    this.userService.getCurrentUser().subscribe(user => {
      this.userAvatar = user.photoURL ? user.photoURL : this.userAvatar;
    });
  }

  constructor(
    private sidebarService: SidebarService,
    private dashboardService: DashboardService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.getUserName();
    this.getUserAvatar();
  }
}
