import { Injectable, OnInit } from "@angular/core";
import { Employee } from "./model/employee.model";
import { BehaviorSubject, Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { EXT } from "./leave.service";
import { map } from "rxjs/operators";

export enum ADMIN_STATUS {
  pending = "Pending",
  approved = "Approved",
  declined = "Declined"
}

@Injectable( {
               providedIn: "root"
             } )
export class EmployeeService implements OnInit {

  employeeChanged = new Subject<Employee[]>();
  employeeServerUrl = "https://employee-managment-f5252.firebaseio.com/employees";
  employeeSubject = new BehaviorSubject<Employee>( null );

  constructor( private http: HttpClient, private router: Router ) { }

  ngOnInit(): void {
  }

  // Fetch the employee data from Server
  fetchEmployees() {
    return this.http.get( this.employeeServerUrl + EXT ).pipe( map( value => {
      if ( value ) {
        let temp: Employee[] = [];
        for ( const key in value ) {
          temp.push( value[key] );
        }
        return temp;
      }
    } ) );
  }

  storeEmployee( emp: Employee ) {
    this.http.post<Employee>( this.employeeServerUrl + EXT, emp ).subscribe( ( value: Employee ) => {
      value.name = value.name;  // Store unique key as "name" field to be retrieved for updating and deleting later
      // NOTE: UserName and name are 2 different fields
      this.updateEmployee( value, value.name );
    } );
  }

  updateEmployee( emp: Employee, name: string ) {
    this.http.patch<Employee>( this.employeeServerUrl + "/" + name + EXT, emp ).subscribe();
  }

  login( employee: Employee ): void {

    this.employeeSubject.next( employee );

    localStorage.setItem( "Employee", JSON.stringify( employee ) );
    // Store the current user to local storage for auto-login purposes

    this.router.navigate( [ "/home" ] );
  }

  // Logout current user
  logout(): void {
    this.employeeSubject.next( null );  // Clear current subject
    localStorage.removeItem( "Employee" );  // Clear local storage
    this.router.navigate( [ "/login" ] );
  }

  // Delete an employee from the database
  removeEmployee( name: string ): void {
    this.http.delete( this.employeeServerUrl + "/" + name + EXT );
  }
}
