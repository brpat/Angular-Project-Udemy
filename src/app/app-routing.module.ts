import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { PostsCreateComponent } from './posts/posts-create/posts-create.component';
import { PostsListComponent } from './posts/posts-list/posts-list.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  //below line automatically routes root path to posts.
  { path: '', component: PostsListComponent },
  { path: 'create', component: PostsCreateComponent, canActivate: [AuthGuard] },
  { path: 'edit/:postId', component: PostsCreateComponent, canActivate: [AuthGuard]},
  { path:'login', component: LoginComponent},
  { path:'signup', component: SignupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule {}
