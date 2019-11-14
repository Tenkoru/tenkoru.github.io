import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-auth-title",
  templateUrl: "./auth-title.component.html",
  styleUrls: ["./auth-title.component.scss"]
})
export class AuthTitleComponent implements OnInit {
  @Input() props: {
    className: string;
    text: string;
  };

  getClass(): string {
    let className: string = "auth__title ";

    if (this.props.className) {
      className += this.props.className;
    }

    return className;
  }

  constructor() {}

  ngOnInit() {}
}
