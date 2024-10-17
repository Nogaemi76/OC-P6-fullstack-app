import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { ProfileComponent } from './Components/profile/profile.component';
import { SharedModule } from 'src/app/shared/shared.module';

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
