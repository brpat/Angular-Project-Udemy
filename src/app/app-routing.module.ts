import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsCreateComponent } from './posts/posts-create/posts-create.component';
import { PostsListComponent } from './posts/posts-list/posts-list.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  //below line automatically routes root path to posts.
  { path: '', component: PostsListComponent },
  { path: 'create', component: PostsCreateComponent, canActivate: [AuthGuard] },
  { path: 'edit/:postId', component: PostsCreateComponent, canActivate: [AuthGuard]},
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  // { path: '**', redirectTo: '/'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule {}
