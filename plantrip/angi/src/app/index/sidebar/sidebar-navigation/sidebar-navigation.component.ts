import { SidebarService } from './../sidebar.service';
import { Component, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-sidebar-navigation",
  templateUrl: "./sidebar-navigation.component.html",
  styleUrls: ["./sidebar-navigation.component.scss"]
})
export class SidebarNavigationComponent implements OnInit {
  @Output() openCreateNewMenu = new EventEmitter<boolean>();

  links = [
    {
      text: "Мои поездки",
      link: "dashboard",
      isSidebarLink: true
    },
    {
      text: "Мои друзья",
      link: "friends",
      isSidebarLink: true
    }
  ];
  linkCreateNew = {
    text: "Создать новую поездку",
    link: "",
    isSidebarLink: true
  };
  linkClickHandler():void {
    this.sidebarService.setSidebarStatus(false);
  }
  createNewButtonText: string = "Создать новую поездку";
  openMenu(isOpened: boolean) {
    this.openCreateNewMenu.emit(isOpened);
  }

  constructor(private sidebarService: SidebarService) {}

  ngOnInit() {}
}
