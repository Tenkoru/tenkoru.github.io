import { ActivatedRoute } from '@angular/router';
import { DateService } from "../../../../shared/services/date.service";
import { DatabaseService } from "src/app/shared/database/database.service";
import { DetailsService } from "./../../../details/details.service";
import { Component, OnInit, Input } from "@angular/core";
import { Trip } from "src/app/index/app.trip";
import { UserService } from "src/app/shared/user/user.service";
import { Subscription } from "rxjs";
import { Router } from '@angular/router';

@Component({
  selector: "app-dashboard-card",
  templateUrl: "./dashboard-card.component.html",
  styleUrls: ["./dashboard-card.component.scss"]
})
export class DashboardCardComponent implements OnInit {

  constructor(
    private dateService: DateService,
    private userService: UserService,
    private databaseService: DatabaseService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.numbers = Array(5)
      .fill(0)
      .map((x, i) => i + 1);
  }

  @Input() props: Trip;
  @Input() tripList: Trip[];
  @Input() isGrid: boolean;
  @Input() tripsId: string;

  numbers: number[];
  star = {
    icon: "assets/icons/star.svg",
    color: "#02332f",
    filledColor: "#019287"
  };
  linkProps = {
    text: "",
    link: "",
    isCardEditLink: true,
    isGrid: false,
    isButton: false
  };
  mainImg = "assets/images/tripDefault.jpg";
  dates: string = "";
  userServiceSubscription: Subscription;
  databaseSubscription: Subscription;

  clickHandler(): void {
    if (this.props.type === "future") {
      if (this.tripsId) {
        this.activatedRoute.params.subscribe(params => {
          this.router.navigate([`../../details/${params.id}/${this.props.id}`], { relativeTo: this.activatedRoute} );
        })
      } else {
        this.router.navigate([`../details/${this.props.id}`], { relativeTo: this.activatedRoute} );
      }
    }
  }

  cardClasses = {};

  getLinkProps(): void {
    if (this.tripsId) {
      this.linkProps.text = "Посмотреть";
      this.linkProps.isButton = false;
    } else {
      this.linkProps.text = this.props.type === "deleted" ? "Восстановить" : "Редактировать";
      this.linkProps.isButton = this.props.type === "deleted" ? true : false;
    }
  }

  clickRestoreHandler() {
    this.userServiceSubscription = this.userService.getCurrentUser().subscribe(user => {
      let trip = this.tripList.find(item => item.id === this.props.id);
      trip.type = "future";
      this.databaseSubscription = this.databaseService
        .updateTripsData(user.email, { trips: this.tripList })
        .subscribe(() => {});
    });
  }

  setLinkPath() {
    if (this.tripsId) {
      this.linkProps.link = `../../details/${this.tripsId}/${this.props.id}`;
    } else {
      this.linkProps.link = `../details/${this.props.id}`;
    }
  }
  formatDates() {
    this.dates = this.dateService.getParsedDates(this.props.date);
  }
  setNewImage() {
    if (this.props.mainImg) {
      this.mainImg = this.props.mainImg;
    }
  }

  ngOnInit() {
    this.getLinkProps();
    this.formatDates();
    this.linkProps.isGrid = this.isGrid;
    this.setLinkPath();
    this.setNewImage();
    this.cardClasses = {
      "list__item card-item": true,
      clickable: this.props.type === "future" ? true : false
    };
  }
  ngOnDestroy() {
    if (typeof this.userServiceSubscription !== "undefined") {
      this.userServiceSubscription.unsubscribe();
    }
    if (typeof this.databaseSubscription !== "undefined") {
      this.databaseSubscription.unsubscribe();
    }
  }
}
