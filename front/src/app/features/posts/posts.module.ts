import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { DetailComponent } from './components/detail/detail.component';
import { FormComponent } from './components/form/form.component';
import { ListComponent } from './components/list/list.component';

const materialModules = []

@NgModule({
  declarations: [
    DetailComponent,
    FormComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    PostsRoutingModule,
    SharedModule,
    //...materialModules
  ]
})
export class PostsModule { }
