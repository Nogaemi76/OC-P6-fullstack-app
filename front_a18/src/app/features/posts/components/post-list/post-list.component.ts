import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';

import { Router, RouterLink } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';

import { Post } from '../../interfaces/post.interface';
import { PostService } from '../../services/post.service';

import { ResponsiveService } from '../../../../services/responsive.service';

import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { PostCardComponent } from '../../../../shared/components/post-card/post-card.component';

const materialModules = [
  MatButtonModule,
  MatGridListModule,
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
export class PostListComponent implements OnInit, OnDestroy {

  posts!: Post[];
  postsSubscriptions!: any;

  isToggled: boolean = false;

  constructor(
    private postService: PostService,
    private router: Router,
    public responsiveService: ResponsiveService
  ) {}

  ngOnInit(): void {

    this.posts = [];

    this.postsSubscriptions = this.postService.getAllPosts().subscribe({
      next:(posts: Post[]) => {
        this.posts = posts;
        console.log(this.posts);
      },
      error: error => {
        console.log(error);
      }
    });
  }

  ngOnDestroy(): void {
    this.postsSubscriptions.unsubscribe();
  }

  navigateToPageDetail(id:number) {
    this.router.navigate([`/posts/detail/${id}`]);
  }

  reverseArray(posts: Post[]): void {
    this.posts.reverse();
    this.isToggled = !this.isToggled;
  }
}
