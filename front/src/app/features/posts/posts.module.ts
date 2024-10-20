import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { DetailComponent } from './components/detail/detail.component';
import { FormComponent } from './components/form/form.component';
import { ListComponent } from './components/list/list.component';
import { MatGridListModule } from '@angular/material/grid-list';

const materialModules = [
  MatGridListModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule
]

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
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    ...materialModules
  ]
})
export class PostsModule { }
