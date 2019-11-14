import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  isSidebarOpen: boolean;

  sidebarDisplayChange: Subject<boolean> = new Subject<boolean>();

  getSidebarStatus() {
    return this.isSidebarOpen;
  }

  setSidebarStatus(value: boolean) {
    this.sidebarDisplayChange.next(value);
  }

constructor() { 
  this.sidebarDisplayChange.subscribe((value) => {
    this.isSidebarOpen = value;
  });
  
  this.isSidebarOpen = false;
}

}
