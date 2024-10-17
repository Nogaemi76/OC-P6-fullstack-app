import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopicsRoutingModule } from './topics-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListComponent } from './Components/list/list.component';

import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';

const materialModules = [
  MatGridListModule,
  MatCardModule,
  MatButtonModule,
]

@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    TopicsRoutingModule,
    SharedModule,
    FlexLayoutModule,
    ...materialModules
  ]
})
export class TopicsModule { }
