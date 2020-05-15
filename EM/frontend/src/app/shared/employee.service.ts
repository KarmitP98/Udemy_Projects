import { Injectable, OnInit } from "@angular/core";
import { Employee } from "./model/employee.model";
import { BehaviorSubject, Subject } from "rxjs";
import { tap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";


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
  employeeServerUrl = "https://employee-managment-f5252.firebaseio.com/employees.json";
  private employees: Employee[] = [];
  employeeSubject = new BehaviorSubject<Employee>( null );

  constructor( private http: HttpClient, private router: Router ) { }

  ngOnInit(): void {
  }

  getEmployees() {
    return this.employees;
  }

  setEmployees( emps: Employee[] ): void {
    this.employees = emps;
    this.employeeChanged.next( this.employees );
  }

  // Add am employee to the array of employees and store it on the server
  // NOTE: This method will mostly never be called since we will be storing or retreving data when we signup or logout only.

  addEmployee( abv: string, name: string, email: string, isAdmin: boolean, adminStatus: string, password: string ) {
    const empId = this.employees ? this.employees.length : 0;
    const emp = new Employee( empId, abv, name, email, isAdmin, adminStatus, password );
    this.employees.push( emp );
    this.storeEmployees();
  }

  changeAdminStatus( name: string, response: string ) {
    const isAdmin = response === ADMIN_STATUS.approved;
    if ( this.employees ) {
      for ( let emp of this.employees ) {
        if ( emp !== null ) {
          if ( emp.userName === name ) {
            emp.isAdmin = isAdmin;
            emp.adminStatus = response;
          }
        }
      }
    }
    this.storeEmployees();
    this.employeeChanged.next( this.getEmployees().slice() );
  }

  // Fetch the employee data from Server
  fetchEmployees() {
    this.http.get<Employee[]>( this.employeeServerUrl ).pipe( tap( emps => {
      if ( emps ) {
        this.setEmployees( emps );
      }
    } ) ).subscribe();
  }

  // Store employee data to the server
  storeEmployees() {
    this.http.put<Employee[]>( this.employeeServerUrl, this.employees ).subscribe();
  }

  login( email: string, password: string ) {
      this.employeeSubject.next( this.getEmployee( email, password ) );
    localStorage.setItem( "Employee", JSON.stringify( this.getCurrentEmployee() ) );
    setTimeout( () => {
      this.router.navigate( [ "/home" ] );
    }, 0 );

  }

  logout() {
    this.storeEmployees();
    this.employeeSubject.next( null );
    localStorage.removeItem( "Employee" );
    this.router.navigate( [ "/login" ] );
  }

  signup( abv: string, name: string, email: string, password: string, isAdmin: boolean ) {
    this.addEmployee( abv, name, email, false, isAdmin ? ADMIN_STATUS.pending : ADMIN_STATUS.declined, password );
    setTimeout( () => {
      this.login( email, password );
    }, 500 );
  }

  doesMatch( email: string, password: string ): boolean {
    for ( let emp of this.employees ) {
      if ( emp !== null ) {
        if ( emp.userEmail === email && emp.password === password ) {
          return true;
        }
      }
    }
    return false;
  }

  private getEmployee( email: string, password: string ): Employee {
    let result: Employee = null;
    for ( let emp of this.employees ) {
      if ( emp !== null ) {
        if ( emp.userEmail === email ) {
          if ( emp.password === password ) {
            result = emp;
          }
        }
      }
    }
    return result;
  }

  getCurrentEmployee() {
    return this.employeeSubject.getValue();
  }
}
