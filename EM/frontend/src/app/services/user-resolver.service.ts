import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { User } from "../user/user.model";
import { Observable } from "rxjs";
import { UserService } from "./user.service";
import { DataStorageService } from "./data-storage.service";

@Injectable( {
               providedIn: "root"
             } )

export class UserResolverService implements Resolve<User[]> {

  resolve( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Observable<User[]> | Promise<User[]> | User[] {
    const users = this.userService.getUsers();

    if ( users.length === 0 ) {
      this.dataStorageService.fetchEmployeeInfo();
      return this.userService.getUsers();
    }
    else{
      return users;
    }
  }

  constructor( private userService: UserService,
               private dataStorageService: DataStorageService ) { }
}
