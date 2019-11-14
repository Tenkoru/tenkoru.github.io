import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-link",
  templateUrl: "./link.component.html",
  styleUrls: ["./link.component.scss"]
})
export class LinkComponent implements OnInit {
  constructor() {}

  @Input() props: {
    text: string;
    link: string;
    isSidebarLink: boolean;
    isCardEditLink: boolean;
    isGrid: boolean;
    isButton: boolean;
  };
  @Output() clickEventEmitter = new EventEmitter<void>();

  currentClasses: object;

  linkClickHandler() {
    this.clickEventEmitter.emit();
  }

  ngOnInit() {
    this.currentClasses = {
      link: true,
      sidebar__link: this.props.isSidebarLink,
      card__edit: this.props.isCardEditLink,
      grid: this.props.isGrid,
      button: this.props.isButton
    };
  }
}
