import { FriendsService } from "./../friends/friends.service";
import { ActivatedRoute, Router } from "@angular/router";
import { DashboardService } from "src/app/shared/services/dashboard.service";
import { FilterArguments } from "./filterArguments";
import { DashboardFilterService } from "./dashboardFilter.service";
import { DatabaseService } from "../../shared/database/database.service";
import { UserService } from "../../shared/user/user.service";
import { Trip } from "src/app/index/app.trip";
import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  trips: Trip[];
  tripsId: string = "";
  tripsSubscription: Subscription;
  filterArguments: FilterArguments = {
    searchFilterString: "",
    sortType: "name",
    sortDirectionAscending: true
  };
  statuses = {
    isFuture: false,
    isPast: false,
    isDeleted: false
  };
  userServiceSubscription: Subscription;
  databaseSubscription: Subscription;

  filterChangeHandler($event: any): void {
    this.filterArguments.searchFilterString = $event.search.search;
    this.filterArguments.sortType = $event.filter.select;
    this.filterArguments.sortDirectionAscending = $event.filter.isAscending;
    this.checkRouterParams();
  }

  getTrips(): void {
    if (this.tripsId) {
      this.databaseSubscription = this.databaseService.getUserData(this.tripsId).subscribe(userdata => {
        if (userdata.payload.data()) {
          let trips = userdata.payload.data().trips;
          this.trips = this.dashboardFilterService.filterAndSortTrips(trips, this.filterArguments);
          this.dashboardService.setTripsStatus(this.trips);
        }
      });
    } else {
      this.userServiceSubscription = this.userService.getCurrentUser().subscribe(user => {
        this.databaseSubscription = this.databaseService.getUserData(user.email).subscribe(userdata => {
          if (userdata.payload.data()) {
            let trips = userdata.payload.data().trips;
            this.trips = this.dashboardFilterService.filterAndSortTrips(trips, this.filterArguments);
            this.dashboardService.setTripsStatus(this.trips);
          }
        });
      });
    }
  }
  checkRouterParams(): void {
    this.activatedRoute.params.subscribe(routeParams => {
      if (routeParams.id) {
        this.friendsService.isFriend(routeParams.id).subscribe((isFriend: boolean) => {
          if (isFriend) {
            this.tripsId = routeParams.id;
            this.getTrips();
          } else {
            this.router.navigate(["/index"]);
          }
        });
      } else {
        this.getTrips();
      }
    });
  }
  constructor(
    private userService: UserService,
    private databaseService: DatabaseService,
    private dashboardFilterService: DashboardFilterService,
    private dashboardService: DashboardService,
    private activatedRoute: ActivatedRoute,
    private friendsService: FriendsService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.dashboardService.tripsStatusesChange.subscribe(value => {
      this.statuses = value;
    });
  }
  ngOnDestroy() {
    this.filterArguments.searchFilterString = "";
    if (typeof this.databaseSubscription !== "undefined") {
      this.databaseSubscription.unsubscribe();
    }
    if (typeof this.userServiceSubscription !== "undefined") {
      this.userServiceSubscription.unsubscribe();
    }
  }
}
