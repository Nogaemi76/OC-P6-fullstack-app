import { Routes } from '@angular/router';

import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';

export const authRoutes: Routes = [
  { title: 'Register', path: 'register', component: RegisterComponent },
  { title: 'Login', path: 'login', component: LoginComponent },
]
