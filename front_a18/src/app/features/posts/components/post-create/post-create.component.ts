import { Component, OnDestroy } from '@angular/core';

import { Router, RouterLink } from '@angular/router';

import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { Topic } from '../../../topics/interfaces/topic.interface';
import { TopicService } from '../../../topics/services/topic.service';
import { Post } from '../../interfaces/post.interface';
import { PostService } from '../../services/post.service';
import { PostRequest } from '../../interfaces/postRequest.interface';

const materialModules = [
  MatGridListModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule
]

@Component({
  selector: 'app-post-create',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    ...materialModules,
    HeaderComponent,
  ],
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.scss'
})
export class PostCreateComponent implements OnDestroy {

  topics!: Topic[];
  topicsSubscriptions!: any;

  postForm = new FormGroup({
    topicId: new FormControl(0, Validators.required),
    title: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required)
  });

  constructor(
    private topicService: TopicService,
    private postService: PostService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.topics = [];

    this.topicsSubscriptions = this.topicService.getAllTopics().subscribe({
      next:(topics: Topic[]) => {
        this.topics = topics;
      },
      error: error => {
        console.log(error);
      }
    });
  }

  ngOnDestroy(): void {
    this.topicsSubscriptions.unsubscribe();
  }

  submit(): void {
    const postRequest = this.postForm.value as PostRequest;
    console.log(postRequest);
    this.postService.createPost(postRequest).subscribe({
      next: () => {
        this.router.navigate(['/posts']);
        console.log(postRequest);
      },
      error: error => {
        console.log(error);
      }
    })
  }

}
