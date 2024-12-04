import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { Topic } from '../../interfaces/topic.interface';
import { TopicService } from '../../services/topic.service';

import { ResponsiveService } from '../../../../services/responsive.service';

import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { TopicCardComponent } from '../../../../shared/components/topic-card/topic-card.component';

const materialModules = [
  MatGridListModule,
  MatCardModule,
  MatButtonModule,
]

@Component({
  selector: 'app-topic-list',
  standalone: true,
  imports: [
    NgFor,
    ...materialModules,
    HeaderComponent,
    TopicCardComponent
  ],
  templateUrl: './topic-list.component.html',
  styleUrl: './topic-list.component.scss'
})
export class TopicListComponent implements OnInit, OnDestroy {

  topics!: Topic[];
  topicsSubscriptions!: any;

  constructor(
    private topicService : TopicService,
    public responsiveService: ResponsiveService
  ) {}

  ngOnInit(): void {

    this.topics = [];

    this.topicsSubscriptions = this.topicService.getAllTopics().subscribe(
      {
        next:(topics: Topic[]) => {
          this.topics = topics;
          console.log(this.topics);

        },
        error: error => {
          console.log(error);
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.topicsSubscriptions.unsubscribe();
  }
}
