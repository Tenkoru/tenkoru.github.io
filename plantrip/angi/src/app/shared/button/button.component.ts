import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-button",
  templateUrl: "./button.component.html",
  styleUrls: ["./button.component.scss"]
})
export class ButtonComponent implements OnInit {
  constructor() {}

  @Input() props: {
    auth: boolean;
    text: string;
    type: string;
    fade: boolean;
    isSidebar: boolean;
    isDetailsButton: boolean;
    isModalDecline: boolean;
    isFullWidth: boolean;
  };
  @Output() eventEmitter = new EventEmitter<void>();

  classNames = {}

  buttonClickHandler() {
    this.eventEmitter.emit();
  }

  getText(): string {
    return this.props.text || "Кнопка";
  }

  getType(): string {
    return this.props.type || "submit";
  }
  initClassNames() {
    this.classNames = {
      "button": true,
      "auth__button": this.props.auth,
      "auth__button--fade": this.props.fade,
      "sidebar__new-submit": this.props.isSidebar,
      "details__button": this.props.isDetailsButton,
      "modal--decline": this.props.isModalDecline,
      "fullWidth": this.props.isFullWidth,
    }
  }

  ngOnInit() {
    
  }
  ngOnChanges() {
    this.initClassNames();
  }
}
