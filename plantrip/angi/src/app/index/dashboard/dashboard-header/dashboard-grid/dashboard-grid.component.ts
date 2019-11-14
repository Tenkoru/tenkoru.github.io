import { Component, OnInit } from "@angular/core";
import { DashboardService } from "src/app/shared/services/dashboard.service";

@Component({
  selector: "app-dashboard-grid",
  templateUrl: "./dashboard-grid.component.html",
  styleUrls: ["./dashboard-grid.component.scss"]
})
export class DashboardGridComponent implements OnInit {
  activeButton: string = "grid";
  iconColor: string = "#456462";
  iconActiveColor: string = "#ffffff";

  buttons: object[] = [
    {
      type: "grid",
      icon: "assets/icons/grid.svg"
    },
    {
      type: "list",
      icon: "assets/icons/list.svg"
    }
  ];

  changeTableDisplay(type: string): void {
    this.activeButton = type;
    let isGrid: boolean = false;

    if (type === "grid") {
      isGrid = true;
    }
    this.dashboardService.setGridStatus(isGrid);
  }
  getGridStatus(): void {
    this.dashboardService.gridDisplayChange.subscribe(value => {
      this.activeButton = value ? "grid" : "list";
    });
  }

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.getGridStatus();
  }
}
