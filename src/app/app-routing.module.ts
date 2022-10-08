import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsCreateComponent } from './posts/posts-create/posts-create.component';
import { PostsListComponent } from './posts/posts-list/posts-list.component';

const routes: Routes = [
  {path: '', component: PostsListComponent},
  {path: 'create', component: PostsCreateComponent}, 
  {path:'edit/:postId', component:PostsCreateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
