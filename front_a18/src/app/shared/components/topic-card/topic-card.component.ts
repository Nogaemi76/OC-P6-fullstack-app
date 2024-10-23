import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

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

}
