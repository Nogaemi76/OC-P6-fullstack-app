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

  postSubscription!: any;
  commentSubscription!: any;

  commentRequest: CommentRequest = {
    postId: 0,
    content: ''
  }

  commentForm = new FormGroup({
    content: new FormControl('', [Validators.required, Validators.minLength(30)])
  });

  @Input()
  set id(postId: number) {
    console.log(postId);

    this.postSubscription =  this.postService.getPostById(postId).subscribe({
      next:(post:Post) => {
        this.post = post;
        console.log('post', post)
        console.log('this.post', this.post);
      },
      error: error => {
        console.log(error);
      }
    });

    this.commentSubscription = this.commentService.getCommentsByPostId(postId).subscribe({
      next:(comments: Comment[]) => {
        this.comments = comments;

        console.log('this.comments', this.comments);
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
    console.log(this.post);
    console.log(this.commentForm.value);

    const commentRequest = this.commentForm.value as CommentRequest;
    commentRequest.postId = this.post.id;

    console.log(commentRequest);

    this.commentService.createComment(commentRequest).subscribe({
      next: () => {
        console.log("SUCCESS");
      },
      error: error => {
        console.log(error);
      }
    });

  }
}
