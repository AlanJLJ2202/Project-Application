/*import {Component, OnInit, OnDestroy} from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../post.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.css']
  })

  export class PostListComponent implements OnInit, OnDestroy {

    posts: Post[] = [];
    private postsSub: Subscription;

    constructor(public postsService: PostService) {}

    ngOnInit() {
      //this.posts = this.postsService.getPosts();
      this.postsService.getPosts();
      this.postsSub = this.postsService.getPostUpdateListener()
        .subscribe((posts: Post[]) => {
          this.posts = posts;
        });
    }

    ngOnDestroy() {
      this.postsSub.unsubscribe();
    }
  }
*/

import {Component, OnInit, OnDestroy} from '@angular/core';
import { Post } from '../post.model';
import { Subscription } from 'rxjs';
import { PostService } from '../post.service';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})

export class PostListComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {

  }
  ngOnInit(): void {

  }
 /* posts = [
    {title: "Primer post", content: "Este es el contenido del primer post"},
    {title: "Segundo post", content: "Este es el contenido del segundo post"},
    {title: "Tercero post", content: "Este es el contenido del tercer post"}
  ]*/

  posts: Post[] = [];

  private postSub: Subscription;

  constructor(public postsService: PostService) {}


  /*ngOnInit(){
    this.postsService.getPosts();
    this.postSub = this.postsService.getPostsUpadteListener()
    .subscribe((posts: Post[]) =>{
      this.posts = posts;
    });

  }
  ngOnDestroy(){
    this.postSub.unsubscribe();
  }

  onDelete(postId: string){
    this.postsService.deletePost(postId);
  }*/
}
