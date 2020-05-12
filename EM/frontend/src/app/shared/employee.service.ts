import { Injectable } from "@angular/core";
import { Employee } from "./model/user-model.model";
import { Subject } from "rxjs";
import { tap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";

@Injectable( {
               providedIn: "root"
             } )
export class EmployeeService {

  userChanged = new Subject<Employee[]>();
  userServerUrl = "https://employee-managment-f5252.firebaseio.com/users.json";
  private users: Employee[] = [];

  constructor( private http: HttpClient ) { }

  getUser() {
    return this.users;
  }

  setUsers( users: Employee[] ): void {
    this.users = users;
    this.userChanged.next( this.users );
  }

  addUser( abv: string, name: string )

  fetchUsers() {
    return this.http.get<Employee[]>( this.userServerUrl ).pipe( tap( users => {this.setUsers( users );} ) ).subscribe();
  }

  storeUser() {
    const users = this.getUser();
    return this.http.put<Employee[]>( this.userServerUrl, users ).subscribe();
  }
}
