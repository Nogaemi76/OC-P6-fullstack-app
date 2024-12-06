import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';

import { RouterLink } from '@angular/router';

import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { Post } from '../../interfaces/post.interface';
import { PostService } from '../../services/post.service';

import { CommentRequest } from '../../interfaces/commentRequest.interface';
import { Comment } from '../../interfaces/comment.interface';
import { CommentService } from '../../services/comment.service';

import { HeaderComponent } from '../../../../shared/components/header/header.component';

const materialModules = [
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatDividerModule,
]

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [
    NgFor,
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    ...materialModules,
    HeaderComponent,
  ],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.scss'
})
export class PostDetailComponent implements OnInit, OnDestroy {

  postId!: number;
  post: Post = {
    id: 0,
    author: '',
    topic: '',
    title: '',
    content: '',
    created_at: ''
  }

  comments!: Comment[];
  commentRequest!: CommentRequest;

  postSubscription!: any;
  commentSubscription!: any;

  commentForm = new FormGroup({
    content: new FormControl('', [Validators.required, Validators.minLength(30)])
  });

  @Input()
  set id(postId: number) {
    this.postId = postId;

    this.postSubscription =  this.postService.getPostById(postId).subscribe({
      next:(post:Post) => {
        this.post = post;
      },
      error: error => {
        console.log(error);
      }
    });

    this.commentSubscription = this.commentService.getCommentsByPostId(postId).subscribe({
      next:(comments: Comment[]) => {
        this.comments = comments;
      },
      error: error => {
        console.log(error);
      }
    });
  }

  constructor(
    private postService: PostService,
    private commentService: CommentService
  ) {}

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.postSubscription.unsubscribe();
    this.commentSubscription.unsubscribe();
  }

  submit(): void {

    const commentRequest = this.commentForm.value as CommentRequest;
    commentRequest.postId = this.post.id;

    this.commentService.createComment(commentRequest).subscribe({
      next: () => {
        this.commentSubscription = this.commentService.getCommentsByPostId(this.postId).subscribe({
          next:(comments: Comment[]) => {
            this.comments = comments;
            this.commentForm.setValue({ content: '' })
          },
          error: error => {
            console.log(error);
          }
        });
      },
      error: error => {
        console.log(error);
      }
    });
  }
}
