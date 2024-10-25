import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Topic } from '../../../features/topics/interfaces/topic.interface';

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

}
