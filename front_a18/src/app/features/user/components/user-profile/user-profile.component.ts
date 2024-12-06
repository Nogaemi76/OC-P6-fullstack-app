import { Component, OnDestroy, OnInit } from '@angular/core';
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
import { UserRequest } from '../../interfaces/userRequest.interface';
import { UserService } from '../../services/user.service';

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
export class UserProfileComponent implements OnInit, OnDestroy {

  topicSubscriptionArray!: TopicSubscription[];
  topics!: Topic[];

  user!: User;
  userId!: Number;

  userSubscriptions!: any;
  topicsSubscriptions!: any;

  profileForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl('', Validators.email),
  });

  constructor(
    private topicSubscriptionService: TopicSubscriptionService,
    private userSessionService: UserSessionService,
    private userService: UserService,
    private router: Router,
    public responsiveService: ResponsiveService
  ) {}


  ngOnInit() {
    this.topicSubscriptionArray = [];
    this.topics = [];
    this.user;

    this.userId = this.userSessionService.user?.id || 0;

    this.loadData();
  }

  ngOnDestroy(): void {
    this.userSubscriptions.unsubscribe();
    this.topicsSubscriptions.unsubscribe();
  }

  logOut(): void {
    this.userSessionService.logOut();
    this.router.navigate(['']);
  }

  submit(): void {
    const userRequest = this.profileForm.value as UserRequest;

    this.userService.updateUser(this.userId , userRequest).subscribe({
      next: () => {
         this.userSubscriptions = this.userService.getUserById(this.userId).subscribe({
          next: (user: User) => {
            this.user = user;
            this.profileForm.setValue({ name: '', email: ''});
          },
          error: (error) => {
            console.log(error);
          },
         })
      },
      error: error => {
        console.log(error);
      }
    });
  }

  loadData() {
     this.userSubscriptions = this.userService.getUserById(this.userId).subscribe({
      next: (user: User) => {
        this.user = user;

        this.topicsSubscriptions = this.topicSubscriptionService
          .getTopicSubscriptionsByUserId(this.user!.id)
          .subscribe({
            next: (topics: Topic[]) => {
              this.topics = topics;
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

  onRefreshData() {
    this.loadData();
  }
}
