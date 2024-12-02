import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.routes').then((x) => x.authRoutes),
  },
  {
    path: 'posts',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./features/posts/posts.routes').then((x) => x.postsRoutes),
  },
  {
    path: 'topics',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./features/topics/topics.routes').then((x) => x.topicsRoutes),
  },
  {
    path: 'user',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./features/user/user.routes').then((x) => x.userRoutes),
  },
  {
    path: '404',
    component: NotFoundComponent,
  },
  {
    path: '**',
    redirectTo: '404',
  },
];
