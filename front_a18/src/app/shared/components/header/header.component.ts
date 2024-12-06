import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { UserSessionService } from '../../../services/user-session.service';
import { ResponsiveService } from '../../../services/responsive.service';
import { SidenavService } from '../../../services/sidenav.service';

const materialModules = [
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
];

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgIf,
    RouterLink,
    ...materialModules
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  isLogged: Boolean = false;

  constructor(
    private userSessionService : UserSessionService,
    public responsiveService: ResponsiveService,
    private sideNavService: SidenavService
  ) {}

  ngOnInit(): void {
    this.isLogged = this.userSessionService.isLogged;
  }

  toggleSidebar() {
    this.sideNavService.toggleSidenav();
  }

}
