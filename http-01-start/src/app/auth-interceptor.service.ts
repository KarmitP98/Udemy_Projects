import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable( {
               providedIn: 'root'
             } )
// Only responsible for adding the header
export class AuthInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept( req: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {

    const modifiedReq = req.clone(
      { headers: req.headers.append( "Auth", "xyz" ) } );
    return next.handle( modifiedReq );
  }
}
