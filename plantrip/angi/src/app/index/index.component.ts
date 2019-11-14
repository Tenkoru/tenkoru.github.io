import { Component, OnInit } from '@angular/core';
import { SidebarService } from './sidebar/sidebar.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  isSidebarOpen: boolean = false;

  constructor(private sidebarService: SidebarService) {
   }

  ngOnInit() {
    this.isSidebarOpen = this.sidebarService.getSidebarStatus();
    this.sidebarService.sidebarDisplayChange.subscribe(value => {
      this.isSidebarOpen = value;
    });
  }

}
