import { Component } from '@angular/core';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

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
    ...materialModules,
    HeaderComponent,
    TopicCardComponent
  ],
  templateUrl: './topic-list.component.html',
  styleUrl: './topic-list.component.scss'
})
export class TopicListComponent {

}
