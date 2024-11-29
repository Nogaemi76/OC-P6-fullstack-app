import { Component } from '@angular/core';

import { Router, RouterLink } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';

import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { PostCardComponent } from '../../../../shared/components/post-card/post-card.component';
import { Post } from '../../interfaces/post.interface';
import { PostService } from '../../services/post.service';
import { NgFor } from '@angular/common';

import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

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
    ...materialModules,
    HeaderComponent,
    PostCardComponent
  ],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss'
})
export class PostListComponent {

  posts!: Post[];

  constructor(
    private postService: PostService,
    private router: Router
  ) {}

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
    });
  }

  navigateToPageDetail(id:number) {
    this.router.navigate([`/posts/detail/${id}`]);
  }
}
