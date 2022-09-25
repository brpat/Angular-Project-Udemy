import {Injectable} from '@angular/core';
import {Post} from './post.model';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class PostService{
    private posts: Post[] = [];
    private postsUpdated = new Subject<Post[]>();

    constructor(private http: HttpClient) {

    }
    getPosts(){
        this.http.get<{message: '', posts:Post[]}>('http://localhost:3000/api/posts')
        .subscribe((postsData)=>{
            this.posts = postsData.posts;
            this.postsUpdated.next([...this.posts]);
        });
    }

    getPostUpdateListener(){
        return this.postsUpdated.asObservable();
    }

    addPost(title:string, content:string){
        const post = {
            id:'null',
            title:title,
            content:content
        };
        
        this.http.post('http://localhost:3000/api/posts', post)
        .subscribe((responseData)=>{
            this.posts.push(post);
            this.postsUpdated.next([...this.posts]);
        });
    }
}