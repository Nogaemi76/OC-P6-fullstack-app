import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Topic } from '../../../features/topics/interfaces/topic.interface';
import { TopicSubscription } from '../../../features/topics/interfaces/topic-subscription.interface';
import { TopicSubscriptionService } from '../../../features/topics/services/topic_subscription.service';

const materialModules = [
  MatButtonModule,
]

@Component({
  selector: 'app-topic-card',
  standalone: true,
  imports: [
    ...materialModules
  ],
  templateUrl: './topic-card.component.html',
  styleUrl: './topic-card.component.scss'
})
export class TopicCardComponent {

  @Input() topic!: Topic;
  topicSubscription: TopicSubscription = {
    topicId: 0,
    userId: 0
  };

  // TODO : Replace with @Input
  userId: number = 1;

  constructor(private topicSubscriptionService: TopicSubscriptionService) {}

  onSubscribeClick() {
    return this.topicSubscriptionService.subscribeTopic(this.topic.id).subscribe();
  }

  onUnsubscribeClick() {

  }

}
