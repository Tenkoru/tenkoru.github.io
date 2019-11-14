import { Component, OnInit, HostListener, Input } from "@angular/core";
import { DashboardService } from "src/app/shared/services/dashboard.service";
import { Trip } from "src/app/index/app.trip";

@Component({
  selector: "app-dashboard-main",
  templateUrl: "./dashboard-main.component.html",
  styleUrls: ["./dashboard-main.component.scss"]
})
export class DashboardMainComponent implements OnInit {
  @Input() trips: Trip[];
  @Input() statuses: any;
  @Input() tripsId: string;

  isGrid: boolean;
  futureListTitle: string = "Предстоящие поездки:";
  pastListTitle: string = "Прошедшие поездки:";
  deletedListTitle: string = "Удаленные поездки:";

  constructor(
    private dashboardService: DashboardService,
  ) {
    this.isGrid = dashboardService.isGrid;
  }

  @HostListener("window:resize", ["$event"])
  onResize() {
    if (
      window.matchMedia("(max-width: 640px)").matches &&
      this.isGrid === true
    ) {
      this.dashboardService.setGridStatus(false);
    }
  }

  
  getGridStatus(): void {
    this.dashboardService.gridDisplayChange.subscribe(value => {
      this.isGrid = value;
    });
  }

  ngOnInit() {
    this.getGridStatus();
    this.onResize();
  }
}
