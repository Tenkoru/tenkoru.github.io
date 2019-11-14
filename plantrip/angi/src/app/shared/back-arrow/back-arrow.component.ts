import { EventEmitter } from '@angular/core';
import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-back-arrow',
  templateUrl: './back-arrow.component.html',
  styleUrls: ['./back-arrow.component.scss']
})
export class BackArrowComponent implements OnInit {

  @Input() props: {
    className: string;
    link: string;
    isButton: boolean;
  }
  @Output() buttonClickEvent = new EventEmitter<void>();

  image: string= "./assets/icons/backArrow.svg";
  iconColo: string = '#435A59';

  getClass(): string {
    let className: string = "back-arrow ";
    
    if (this.props.className) {
      className += this.props.className;
    }
    return className;
  }

  buttonClickHandler() {
    this.buttonClickEvent.emit();
  }
  

  constructor() { }

  ngOnInit() {
  }

}
