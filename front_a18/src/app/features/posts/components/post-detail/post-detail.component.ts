import { Component, Input } from '@angular/core';

import { RouterLink } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { PostService } from '../../services/post.service';
import { Post } from '../../interfaces/post.interface';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommentRequest } from '../../interfaces/commentRequest';

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
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    ...materialModules,
    HeaderComponent,
  ],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.scss'
})
export class PostDetailComponent {

  postId!: number;
  post: Post = {
    id: 0,
    authorId: 0,
    topicId: 0,
    title: '',
    content: ''
  }

  commentRequest: CommentRequest = {
    topicId: 0,
    userId: 0,
    content: ''
  }

  commentForm = new FormGroup({
    content: new FormControl('', [Validators.required, Validators.minLength(30)])
  });

  @Input()
  set id(postId: number) {
    console.log(postId);
    this.postService.getPostById(postId).subscribe({
      next:(post:Post) => {
        this.post = post;
        console.log(this.post);
      },
      error: error => {
        console.log(error);
      }
    });
  }

  constructor(
    private postService: PostService,
  ) {}

  ngOnInit(): void {
  }

  submit(): void {
    console.log(this.post);
    console.log(this.commentForm.value);
  }

}
