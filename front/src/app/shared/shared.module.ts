import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';

import {MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TopicCardComponent } from './components/topic-card/topic-card.component';
import { FlexLayoutModule } from '@angular/flex-layout';

const materialModules = [
  MatToolbarModule,
  MatButtonModule,
  MatIconModule
];

@NgModule({
  declarations: [
    HeaderComponent,
    TopicCardComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    ...materialModules
  ],
  exports: [
    HeaderComponent,
    TopicCardComponent
  ]
})
export class SharedModule { }
