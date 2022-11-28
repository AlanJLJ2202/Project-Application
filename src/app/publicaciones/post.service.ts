import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from "@angular/router";

@Injectable({providedIn: 'root'})

export class PostService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private router: Router){

  }

  getPosts() {
    return [...this.posts];
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(name: string, title: string, content: string) {
    const post: Post = {name: name, title: title, content: content};
    this.posts.push(post);
    this.postsUpdated.next([...this.posts]);
    this.router.navigate(["/"]);
  }
}
