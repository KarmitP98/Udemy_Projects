import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpEventType,
  HttpHeaders,
  HttpParams
} from "@angular/common/http";
import { Post } from "./post.model";
import { catchError, map, tap } from "rxjs/operators";
import { Subject, throwError } from "rxjs";

@Injectable( {
               providedIn: 'root'
             } )
export class PostsService {

  error = new Subject<string>();

  constructor( private http: HttpClient ) { }

  createAndStorePost( title: string, content: string ) {
    const postData: Post = { title, content };
    // Send Http request
    this.http
        .post(
          'https://project-1-aa193.firebaseio.com/posts.json',
          postData, {
            observe: "body"
          } // Gives the entire response instead of just the body or header
        )
        .subscribe( responseData => {
          console.log( responseData );
        }, error1 => {
          this.error.next( error1.message );
        } );
  }

  fetchPost() {
    let searchParams = new HttpParams();
    searchParams = searchParams.append( "print", "pretty" );
    searchParams = searchParams.append( "custom", "key" );

    //Wait 1.5s to fetch
    // Send Http request
    return this.http.get(
      'https://project-1-aa193.firebaseio.com/posts.json',
      {
        headers: new HttpHeaders( { "Custom-Header": "Hello" } ),
        params: searchParams,
        responseType: "json"
      } )
               .pipe( map( ( responseData: { [key: string]: Post } ) => {
                 const postsArray: Post[] = [];
                 for ( const key in responseData ) {
                   if ( responseData.hasOwnProperty( key ) ) {
                     postsArray.push( { ...responseData[key], id: key } );
                   }
                 }
                 return postsArray;
               } ), catchError( error => {
                 return throwError( error );
               } ) );

  }

  deletePosts() {
    return this.http.delete(
      'https://project-1-aa193.firebaseio.com/posts.json',
      {
        observe: "events",
        responseType: "text"
      } ).pipe( tap( event => {
      console.log( event );
      // If you want to take control of the status of your request
      if ( event.type === HttpEventType.Response ) {
        console.log( event.body );
      }
    } ) );
  }

}
