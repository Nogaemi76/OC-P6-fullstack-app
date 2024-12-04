import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { UserSessionService } from '../../../services/user-session.service';

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
export class HeaderComponent {

  isLogged: Boolean = false;

  constructor(
    private userSessionService : UserSessionService
  ) {}

  ngOnInit(): void {

    this.isLogged = this.userSessionService.isLogged;
  }

  toggleMenu() {
    alert("hello");
  }

}
