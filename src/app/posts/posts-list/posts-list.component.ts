import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit {
  // posts = [
  //   {title: 'First Post', content: 'First Content'},
  //   {title: 'Second Post', content: 'Second Content'},
  //   {title: 'Third Post', content: 'Third Content'},
  // ]
  @Input() posts :any[] =  [];
  constructor() { }

  ngOnInit(): void {
  }

}
