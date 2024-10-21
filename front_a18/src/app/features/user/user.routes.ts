import { Routes } from '@angular/router';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

export const userRoutes: Routes = [
   { title: 'User - Profile', path: 'profile', component: UserProfileComponent },
]
