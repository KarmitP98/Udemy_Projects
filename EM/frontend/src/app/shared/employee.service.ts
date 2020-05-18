import { Injectable, OnInit } from "@angular/core";
import { Employee } from "./model/employee.model";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { EXT } from "./leave.service";


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
  fetchEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>( this.employeeServerUrl + EXT );
  }

  // Store employee data to the server
  storeEmployee( employees: Employee[] ) {
    this.http.put<Employee[]>( this.employeeServerUrl + EXT, employees ).subscribe();
  }

  // Update employee data
  updateEmployee( employee: Employee, userId: number ): void {
    this.http.patch<Employee>( this.employeeServerUrl + "/" + userId + EXT, employee ).subscribe();
  }

  login( employee: Employee ): void {

    this.employeeSubject.next( employee );

    localStorage.setItem( "Employee", JSON.stringify( employee ) );
    // Store the current user to local storage for auto-login purposes

    this.router.navigate( [ "/home" ] );
  }

  logout(): void {
    this.employeeSubject.next( null );
    localStorage.removeItem( "Employee" );  // Clear local storage
    this.router.navigate( [ "/login" ] );
  }

}
