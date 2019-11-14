import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-textarea",
  templateUrl: "./textarea.component.html",
  styleUrls: ["./textarea.component.scss"]
})
export class TextareaComponent implements OnInit {
  @Input() props: {
    text: string;
    type: string;
    isSidebar: boolean;
  };
  textAreaClasses = {};

  constructor() {}

  ngOnInit() {
    this.textAreaClasses = {
      textarea: true,
      "sidebar__textarea": this.props.isSidebar,
    }
  }
}
