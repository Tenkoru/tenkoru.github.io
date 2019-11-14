import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-label",
  templateUrl: "./label.component.html",
  styleUrls: ["./label.component.scss"]
})
export class LabelComponent implements OnInit {
  @Input() props: {
    auth: boolean;
    text: string;
    required: boolean;
    password: boolean;
  };

  inputClasses = {};
  labelClasses = {}

  getText(): string {
    return this.props.text || "";
  }


  isRequred(): boolean {
    return this.props.required;
  }

  constructor() {}

  ngOnInit() {
    this.inputClasses = {
      input: true,
      auth__input: this.props.auth,
      "auth__input--password": this.props.password
    };
    this.labelClasses = {
      label: true,
      "auth__label": this.props.auth,
    }
  }
}
