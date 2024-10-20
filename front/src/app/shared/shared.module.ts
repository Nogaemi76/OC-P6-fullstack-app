import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { HeaderComponent } from './components/header/header.component';
import { TopicCardComponent } from './components/topic-card/topic-card.component';
import { RouterModule } from '@angular/router';
import { PostCardComponent } from './components/post-card/post-card.component';


const materialModules = [
  MatToolbarModule,
  MatButtonModule,
  MatIconModule
];

@NgModule({
  declarations: [
    HeaderComponent,
    TopicCardComponent,
    PostCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    ...materialModules
  ],
  exports: [
    HeaderComponent,
    TopicCardComponent,
    PostCardComponent
  ]
})
export class SharedModule { }
