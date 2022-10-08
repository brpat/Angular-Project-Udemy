import { Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import {Post} from '../post.model';
import { PostService } from '../posts.service';
import { ActivatedRoute } from '@angular/router';
import { ParamMap } from '@angular/router';
import * as e from 'express';


@Component({
  selector: 'app-posts-create',
  templateUrl: './posts-create.component.html',
  styleUrls: ['./posts-create.component.css']
})
export class PostsCreateComponent implements OnInit{
  enteredValue = '';
  enteredTitle = '';
  isLoading = false;
  postService: PostService;
  private mode = 'edit';
  private postId:string|null|undefined = '';
  post:Post|null = null;
  constructor(postService:PostService, public route: ActivatedRoute) { 
    this.postService = postService;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap:ParamMap) => {
      if(paramMap.has('postId')){
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.isLoading = true;
        this.postService.getPost(this.postId).subscribe(postData=>{
          this.isLoading = false;
          this.post = {id:postData._id, title:postData.title, content:postData.content};
          console.log(this.post);
        });
      }else{
        this.mode = 'create';
        this.postId = null;
      }
    });
  }

  onSavePost(form:NgForm){
    //newPost = postInputRef.value;
    if (form.invalid){
      return;
    }
    this.isLoading = true;
    if(this.mode == 'create'){
      this.postService.addPost(form.value.title, form.value.content);
    } else{
      this.postService.updatePost(this.postId, form.value.title, form.value.content);
    }
    form.resetForm();
  }

}
