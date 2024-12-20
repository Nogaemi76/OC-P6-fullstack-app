import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { SidenavService } from './services/sidenav.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';

const materialModules = [
  MatSidenavModule,
  MatButtonModule,
  MatIconModule,
  MatListModule,
]

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    ...materialModules,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  @ViewChild('sidenav') sidenav!: MatSidenav;

  isSidenavOpen = false;

  constructor(private sidenavService: SidenavService) {}

  ngOnInit(): void {
    this.sidenavService.getToggleObservable().subscribe(() => {
      if (this.sidenav) {
        this.sidenav.toggle();
      }
    });
  }

  closeSidenav() {
    this.sidenav.close();
  }
}
