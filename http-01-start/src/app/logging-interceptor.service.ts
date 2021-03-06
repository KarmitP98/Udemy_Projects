import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable( {
               providedIn: 'root'
             } )
// Only responsible fo logging the stages.
export class LoggingInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept( req: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
    console.log( "Outgoing request" );
    console.log( req.url );
    console.log( req.headers.keys() );
    return next.handle( req ).pipe( tap( event => {
      if ( event.type === HttpEventType.Response ) {
        console.log( "Incoming response" );
        console.log( event.body );
      }
    } ) );
  }
}
