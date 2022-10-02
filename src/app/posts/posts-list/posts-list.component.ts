import { Component, OnDestroy, OnInit} from '@angular/core';
import {Post} from '../post.model';
import {PostService} from '../posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit, OnDestroy {
  // posts = [
  //   {title: 'First Post', content: 'First Content'},
  //   {title: 'Second Post', content: 'Second Content'},
  //   {title: 'Third Post', content: 'Third Content'},
  // ]
  postService: PostService;
  posts:Post[] = [];
  private postsSub:Subscription = new Subscription();
  constructor(postService: PostService) {
    this.postService = postService;
   }

  ngOnInit(): void {
    this.postService.getPosts(); 
    this.postsSub = this.postService.getPostUpdateListener().subscribe((posts:Post[])=>{
        this.posts = posts;
    });
  }

  ngOnDestroy(): void {
    this.postsSub.unsubscribe();
  }

  onDelete(postId:string): void {
    console.log("Deleting Post"+postId);
    this.postService.deletePost(postId);
  }

}
