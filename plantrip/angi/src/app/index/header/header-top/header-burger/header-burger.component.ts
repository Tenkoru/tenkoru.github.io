import { SidebarService } from "../../../sidebar/sidebar.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-header-burger",
  templateUrl: "./header-burger.component.html",
  styleUrls: ["./header-burger.component.scss"]
})
export class HeaderBurgerComponent implements OnInit {
  image: string = "./assets/icons/menu.svg";
  iconColor: string = "#3C9891";

  constructor(private sidebarService: SidebarService) {}

  ngOnInit() {}
  toggleSidebar(event: boolean): void {
    this.sidebarService.setSidebarStatus(event);
  }
}
