import { Component, EventEmitter, Output} from '@angular/core';


@Component({
  selector: 'app-posts-create',
  templateUrl: './posts-create.component.html',
  styleUrls: ['./posts-create.component.css']
})
export class PostsCreateComponent {
  enteredValue = '';
  enteredTitle = '';
  @Output() postCreated = new EventEmitter();
  constructor() { }

  onAddPost(){
    //newPost = postInputRef.value;
    const post = {
      title: this.enteredTitle,
      content : this.enteredValue
    }
    this.postCreated.emit(post);
  }

}
