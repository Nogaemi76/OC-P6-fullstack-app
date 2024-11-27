import { Component } from '@angular/core';

import { RouterLink, RouterOutlet } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';

import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { PostCardComponent } from '../../../../shared/components/post-card/post-card.component';
import { Post } from '../../interfaces/post.interface';
import { PostService } from '../../services/post.service';
import { NgFor } from '@angular/common';

const materialModules = [
  MatGridListModule,
  MatButtonModule,
  MatIconModule
]

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [
    NgFor,
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

  posts!: Post[];

  constructor(private postService: PostService) {}

  ngOnInit(): void {

    this.posts = [];

    this.postService.getAllPosts().subscribe({
      next:(posts: Post[]) => {
        this.posts = posts;
        console.log(this.posts);
      },
      error: error => {
        console.log(error);
      }
    })
  }
}
