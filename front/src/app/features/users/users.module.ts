import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';

import { SharedModule } from 'src/app/shared/shared.module';

import { ProfileComponent } from './Components/profile/profile.component';

const materialModules = []

@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    //...materialModules
  ]
})
export class UsersModule { }
