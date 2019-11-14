import { SidebarService } from "../sidebar.service";
import { Router } from "@angular/router";
import { UserService } from "../../../shared/user/user.service";
import { DatabaseService } from "src/app/shared/database/database.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { IDatePickerConfig } from "ng2-date-picker";

@Component({
  selector: "app-sidebar-new",
  templateUrl: "./sidebar-new.component.html",
  styleUrls: ["./sidebar-new.component.scss"]
})
export class SidebarNewComponent implements OnInit {
  title: string = "Создать новую поездку";

  submitButtonText = "Добавить";
  nameText = "Введите название";
  dateStartText = "Начало";
  dateEndText = "Конец";
  textareaText = "Описание";
  newTripForm: FormGroup;

  dpDateStartConfig: IDatePickerConfig = {
    format: "DD/MM/YYYY",
    opens: "right",
    locale: "ru"
  };
  dpDateEndConfig: IDatePickerConfig = {
    format: "DD/MM/YYYY",
    opens: "left",
    locale: "ru"
  };
  dateMask = "d0/M0/0000";

  initData() {
    this.newTripForm = this.formBuilder.group({
      title: ["", [Validators.required]],
      dateStart: ["", [Validators.required]],
      dateEnd: [""],
      description: [""]
    });
  }
  submitHandler() {
    if (this.newTripForm.status === "VALID") {
      this.userService.getCurrentUser().subscribe(user => {
        this.databaseService.createNewTrip(user.email, this.newTripForm).subscribe(newTripId => {
          this.newTripForm.reset();
          this.router.navigateByUrl(`index/details/${newTripId}`);
          this.sidebarService.setSidebarStatus(false);
        });
      });
    }
  }

  constructor(
    private formBuilder: FormBuilder,
    private databaseService: DatabaseService,
    private userService: UserService,
    private router: Router,
    private sidebarService: SidebarService
  ) {}

  ngOnInit() {
    this.initData();
  }
}
