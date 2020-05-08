import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree
} from "@angular/router";
import { Observable } from "rxjs";
import { UsersService } from "./users.service";

@Injectable( {
               providedIn: 'root'
             } )
export class LoginGaurdService implements CanActivate {

  constructor( private usersService: UsersService ) { }

  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.usersService.isAuthenticated()
               .then(
                 ( authenticated: boolean ) => {
                   if ( authenticated ) {
                     return true;
                   } else {
                     return false;
                   }
                 }
               );
  }
}
