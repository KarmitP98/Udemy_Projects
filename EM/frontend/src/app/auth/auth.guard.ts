import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";
import { EmployeeService } from "../shared/employee.service";

@Injectable( {
               providedIn: "root"
             } )
export class AuthGuard implements CanActivate {

  constructor( private employeeService: EmployeeService, private router: Router ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // @ts-ignore
    // return this.authService.user.pipe( take( 1 ), map( user => {
    //   const isAuth = !!user;
    //   if ( isAuth ) {
    //     return true;
    //   } else {
    //     return this.router.navigate( [ "/auth" ] );
    //   }
    // } ) );
    return this.employeeService.employeeSubject.pipe( take( 1 ), map( employee => {
      const isAuth = !!employee;
      if ( isAuth ) {
        return true;
      } else {
        return this.router.navigate( [ "/login" ] );
      }
    } ) );
  }

}
