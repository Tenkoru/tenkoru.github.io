import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/authentication/auth.service';
import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../sidebar.service';

@Component({
  selector: 'app-sidebar-bottom',
  templateUrl: './sidebar-bottom.component.html',
  styleUrls: ['./sidebar-bottom.component.scss']
})
export class SidebarBottomComponent implements OnInit {

  links = [
    {
      text: "Выйти из аккаунта",
      link: "auth",
    },
  ];

  logoutClickHandler() {
    this.authService.doLogout().subscribe(() => {
      this.router.navigateByUrl('/auth');
      this.closeSidebar();
    })
  }
  closeSidebar() {
    this.sidebarService.setSidebarStatus(false);
  }

  constructor(private authService: AuthService, private router: Router, private sidebarService: SidebarService) { }

  ngOnInit() {
  }

}
