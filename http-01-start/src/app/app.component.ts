import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from "./post.model";
import { PostsService } from "./posts.service";
import { Subscription } from "rxjs";

@Component( {
              selector: 'app-root',
              templateUrl: './app.component.html',
              styleUrls: [ './app.component.css' ]
            } )
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  isFetching = false;
  error = null;
  sub: Subscription;

  constructor( private http: HttpClient,
               private postsService: PostsService ) {}

  ngOnInit() {
    this.onFetchPosts();
    this.sub = this.postsService.error.subscribe( error1 => {
      this.error = error1;
    } );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onCreatePost( postData: { title: string; content: string } ) {
    console.log( postData );
    this.postsService.createAndStorePost( postData.title, postData.content );
  }

  onFetchPosts() {
    this.isFetching = true;
    this.postsService.fetchPost().subscribe( posts => {
      this.isFetching = false;
      this.loadedPosts = posts;
    }, error => {
      this.error = error.message;
    } );
  }

  onClearPosts() {
    // Send Http request
    this.postsService.deletePosts().subscribe( () => {
      this.loadedPosts = [];
    } );
  }

  onHandleError(): void {
    this.error = null;
    this.isFetching = false;
  }
}
