import { FormBuilder, Validators } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { Subscription, pipe, interval } from "rxjs";
import { debounce, debounceTime } from "rxjs/operators";

@Component({
  selector: "app-dashboard-header",
  templateUrl: "./dashboard-header.component.html",
  styleUrls: ["./dashboard-header.component.scss"]
})
export class DashboardHeaderComponent implements OnInit {
  constructor(private formbuilder: FormBuilder) {}

  @Output() filterEmitter = new EventEmitter();

  filterGroup: FormGroup;

  filterSubscription: Subscription;

  initForm(): void {
    this.filterGroup = this.formbuilder.group({
      search: this.formbuilder.group({
        search: ["", [Validators.required]]
      }),
      filter: this.formbuilder.group({
        select: [""],
        isAscending: [true]
      })
    });
  }

  ngOnInit() {
    this.initForm();
    this.filterSubscription = this.filterGroup.valueChanges.pipe(debounceTime(400)).subscribe(value => {
      this.filterEmitter.emit(value);
    });
  }
  ngOnDestroy() {
    if (typeof this.filterSubscription !== "undefined") {
      this.filterSubscription.unsubscribe();
    }
  }
}
