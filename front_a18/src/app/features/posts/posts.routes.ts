import { Routes } from '@angular/router';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostCreateComponent } from './components/post-create/post-create.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';

export const postsRoutes: Routes = [
  { title: 'Posts', path: '', component: PostListComponent },
  { title: 'Posts - Create', path: '/create', component: PostCreateComponent },
  { title: 'Posts - Detail', path: '/detail/:id', component: PostDetailComponent}
]
