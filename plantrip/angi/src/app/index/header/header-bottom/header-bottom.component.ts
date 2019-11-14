import { ActivatedRoute, RouterState, Router, NavigationEnd } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { Location } from '@angular/common';

@Component({
  selector: "app-header-bottom",
  templateUrl: "./header-bottom.component.html",
  styleUrls: ["./header-bottom.component.scss"]
})
export class HeaderBottomComponent implements OnInit {
  title: string = "Список поездок";
  titles = {
    dashboard: "Список поездок",
    details: "Информация о поездке",
    friends: "Друзья"
  };
  isArrowShown = true;
  arrowProps = {
    link: "..",
    className: "headerArrow",
    isButton: true,
  };

  constructor(private router: Router, private _location: Location) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.setTitleByUrl(event.urlAfterRedirects);
      }
    });
  }
  arrowClickHandler():void {
    this._location.back();
  }
  setTitleByUrl(url: string): void {
    this.isArrowShown = true;
    if (url.match("dashboard")) {
      this.isArrowShown = false;
      this.title = this.titles.dashboard;
    } else if (url.match("details")) {
      this.title = this.titles.details;
    } else if (url.match("friends")) {
      this.title = this.titles.friends;
    }
  }

  ngOnInit() {}
}
