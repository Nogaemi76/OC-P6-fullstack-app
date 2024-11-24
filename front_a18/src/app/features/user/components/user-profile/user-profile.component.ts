import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgFor } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';

import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { TopicCardComponent } from "../../../../shared/components/topic-card/topic-card.component";

import { TopicSubscription } from '../../../topics/interfaces/topic-subscription.interface';
import { TopicSubscriptionService } from '../../../topics/services/topic_subscription.service';
import { Topic } from '../../../topics/interfaces/topic.interface';

const materialModules = [
  MatGridListModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatDividerModule,
]

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    NgFor,
    RouterLink,
    RouterOutlet,
    FormsModule,
    ReactiveFormsModule,
    ...materialModules,
    HeaderComponent,
    TopicCardComponent
],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {

  topicSubscriptions!: TopicSubscription[];
  topics!: Topic[];

  // TODO : Replace with @Input
  userId: number = 1;

  profileForm = new FormGroup({
    username: new FormControl(''),
    email: new FormControl('', Validators.email)
  });

  constructor(
    private topicSubscriptionService : TopicSubscriptionService
    ) {}

  ngOnInit() {

    this.topicSubscriptions = [];
    this.topics = [];

    this.topicSubscriptionService.getTopicSubscriptionsByUserId(this.userId).subscribe({
        next:(topic:Topic[]) => {
          this.topics = topic;
          console.log(this.topics);
        },
        error: error => {
          console.log(error);
        }
    });
  }

}
