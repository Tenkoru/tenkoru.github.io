import { FormGroup } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-filter',
  templateUrl: './dashboard-filter.component.html',
  styleUrls: ['./dashboard-filter.component.scss']
})
export class DashboardFilterComponent implements OnInit {

  @Input() selectProps: FormGroup;

  buttonImage: string = "assets/icons/dropdownArrow.svg";
  sortArrowImg: string = "assets/icons/backArrow.svg";
  isArrowUp: boolean;
  filterOptions: any[] = [
    {
      text: "Сортировать по названию",
      value: "title",
    },
    {
      text: "Сортировать по дате",
      value: "date",
    },
    {
      text: "Сортировать по рейтингу",
      value: "rating",
    },
  ];
  defaultOption: string = this.filterOptions[0].value;

  changeSelectHandler($event: Event) {
    this.selectProps.controls.select.setValue((<HTMLInputElement>$event.target).value.split(" ")[1]);
  }

  ButtonclickListener(): void {
    this.selectProps.controls.isAscending.setValue(!this.isArrowUp);
    this.isArrowUp = !this.isArrowUp;
  }

  constructor() { }

  ngOnInit() {
    this.isArrowUp = this.selectProps.controls.isAscending.value;
    this.selectProps.controls.select.setValue(this.defaultOption);
  }

}
