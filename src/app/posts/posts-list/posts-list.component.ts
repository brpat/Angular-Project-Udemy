import { Component, OnDestroy, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../posts.service';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css'],
})
export class PostsListComponent implements OnInit, OnDestroy {
  // posts = [
  //   {title: 'First Post', content: 'First Content'},
  //   {title: 'Second Post', content: 'Second Content'},
  //   {title: 'Third Post', content: 'Third Content'},
  // ]
  postService: PostService;
  posts: Post[] = [];
  totalPosts = 0;
  postsPerPage = 2;
  isLoading = false;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  private postsSub: Subscription = new Subscription();
  constructor(postService: PostService) {
    this.postService = postService;
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.postService.getPosts(this.postsPerPage, this.currentPage);
    this.postsSub = this.postService
      .getPostUpdateListener()
      .subscribe((postData: {posts:Post[], postCount:number}) => {
        this.isLoading = false;
        this.totalPosts = postData.postCount;
        this.posts = postData.posts;
      });
  }

  ngOnDestroy(): void {
    this.postsSub.unsubscribe();
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex+1;
    this.postsPerPage = pageData.pageSize;
    this.postService.getPosts(this.postsPerPage, this.currentPage);
  }

  onDelete(postId: string): void {
    this.isLoading = true;
    this.postService.deletePost(postId).subscribe(()=>{
      this.postService.getPosts(this.postsPerPage, this.currentPage);
    })
  }
}
