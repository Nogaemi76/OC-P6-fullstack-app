import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';

import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { TopicCardComponent } from '../../../../shared/components/topic-card/topic-card.component';

import { TopicSubscription } from '../../../topics/interfaces/topic-subscription.interface';
import { TopicSubscriptionService } from '../../../topics/services/topic_subscription.service';
import { Topic } from '../../../topics/interfaces/topic.interface';

import { UserSessionService } from '../../../../services/user-session.service';
import { User } from '../../interfaces/user.interface';
import { AuthService } from '../../../auth/services/auth.service';
import { ResponsiveService } from '../../../../services/responsive.service';

const materialModules = [
  MatGridListModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatDividerModule,
];

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    FormsModule,
    ReactiveFormsModule,
    ...materialModules,
    HeaderComponent,
    TopicCardComponent,
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent {
  topicSubscriptions!: TopicSubscription[];
  topics!: Topic[];
  user!: User;

  profileForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl('', Validators.email),
  });

  constructor(
    private authService : AuthService,
    private topicSubscriptionService: TopicSubscriptionService,
    private userSessionService: UserSessionService,
    private router: Router,
    public responsiveService: ResponsiveService
  ) {}

  ngOnInit() {
    this.topicSubscriptions = [];
    this.topics = [];
    this.user;

    this.authService.me().subscribe({
      next: (user: User) => {
        this.user = user;
        console.log('user', this.user);

        this.topicSubscriptionService
          .getTopicSubscriptionsByUserId(this.user!.id)
          .subscribe({
            next: (topic: Topic[]) => {
              this.topics = topic;
              console.log(this.topics);
            },
            error: (error) => {
              console.log(error);
            },
          });
        },
        error: (error) => {
          console.log(error);
        },
    });
  }

  logOut(): void {
    this.userSessionService.logOut();
    this.router.navigate(['']);
  }
}
