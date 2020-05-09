import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UserService } from "./user.service";
import { User } from "../user/user.model";
import { map, tap } from "rxjs/operators";

@Injectable( {
               providedIn: "root"
             } )
export class DataStorageService {

  serverUrl = "https://employee-managment-f5252.firebaseio.com/employees.json";

  constructor( private http: HttpClient,
               private userService: UserService ) { }

  saveEmployeeInfo() {
    const users: User[] = this.userService.getUsers();
    this.http.put( this.serverUrl, users ).subscribe( response => {
      console.log( "Saved" );
      console.log( response );
    } );
  }

  fetchEmployeeInfo() {
    this.http.get<User[]>( this.serverUrl ).pipe( tap(
      users => {
        if ( users ) {
          console.log( "Fetched" );
          console.log( users );
          this.userService.setUsers( users );
        }
      }
    ), map( users => {
      return users.map( user => {
        return {
          ...user.leaves = user.leaves ? user.leaves : [],
          ...user.timeSheets = user.timeSheets ? user.timeSheets : []
        };
      } );
    } ) ).subscribe();
  }
}
