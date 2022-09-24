import { Component} from '@angular/core';
import { NgForm } from '@angular/forms';
import {Post} from '../post.model';
import { PostService } from '../posts.service';


@Component({
  selector: 'app-posts-create',
  templateUrl: './posts-create.component.html',
  styleUrls: ['./posts-create.component.css']
})
export class PostsCreateComponent {
  enteredValue = '';
  enteredTitle = '';
  postService: PostService;
  constructor(postService:PostService) { 
    this.postService = postService;
  }

  onAddPost(form:NgForm){
    //newPost = postInputRef.value;
    if (form.invalid){
      return;
    }
    this.postService.addPost(form.value.title, form.value.content);
    form.resetForm();
  }

}
