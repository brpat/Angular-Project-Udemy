import { Component, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular App';
  storedPosts :JSON[] = [];

  onPostAdded (post:JSON){
    this.storedPosts.push(post);
  }
}
