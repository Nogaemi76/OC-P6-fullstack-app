import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIf } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';

import { Topic } from '../../../features/topics/interfaces/topic.interface';
import { TopicSubscriptionService } from '../../../features/topics/services/topic_subscription.service';

const materialModules = [
  MatButtonModule
];

@Component({
  selector: 'app-topic-card',
  standalone: true,
  imports: [
    NgIf,
    ...materialModules
  ],
  templateUrl: './topic-card.component.html',
  styleUrl: './topic-card.component.scss',
})
export class TopicCardComponent {
  @Input() topic!: Topic;

  @Input() isSubscribed: boolean = false;

  @Output() refreshObservable = new EventEmitter<void>();

  constructor(private topicSubscriptionService: TopicSubscriptionService) {}

  onSubscribeClick() {
    return this.topicSubscriptionService
      .subscribeTopic(this.topic.id)
      .subscribe();
  }

  onUnsubscribeClick() {
    this.refreshObservable.emit();
    return this.topicSubscriptionService
      .deleteSubscriptionByTopicId(this.topic.id)
      .subscribe();
  }
}
