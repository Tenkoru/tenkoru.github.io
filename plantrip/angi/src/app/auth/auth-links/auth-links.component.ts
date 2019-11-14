import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-auth-links',
  templateUrl: './auth-links.component.html',
  styleUrls: ['./auth-links.component.scss']
})
export class AuthLinksComponent implements OnInit {

  @Input() links: string[];

  constructor() { }

  ngOnInit() {
  }

}
