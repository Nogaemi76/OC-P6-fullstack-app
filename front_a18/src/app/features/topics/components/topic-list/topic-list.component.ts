import { Component, OnInit } from '@angular/core';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { TopicCardComponent } from '../../../../shared/components/topic-card/topic-card.component';
import { Topic } from '../../interfaces/topic.interface';
import { TopicService } from '../../services/topic.service';
import { NgFor } from '@angular/common';

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
export class TopicListComponent implements OnInit {

  topics!: Topic[];

  constructor(private topicService : TopicService) {}

  ngOnInit(): void {

    this.topics = [];

    this.topicService.getAllTopics().subscribe(
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
}
