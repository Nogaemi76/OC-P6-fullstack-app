import { Component } from '@angular/core';

import { RouterLink, RouterOutlet } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';

import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { PostCardComponent } from '../../../../shared/components/post-card/post-card.component';

const materialModules = [
  MatGridListModule,
  MatButtonModule,
  MatIconModule
]

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    ...materialModules,
    HeaderComponent,
    PostCardComponent
  ],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss'
})
export class PostListComponent {

}
