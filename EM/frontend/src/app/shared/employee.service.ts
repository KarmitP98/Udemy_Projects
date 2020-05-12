import { Injectable } from "@angular/core";
import { Employee } from "./model/employee.model";
import { Subject } from "rxjs";
import { tap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";


export enum ADMIN_STATUS {
  pending = "Pending",
  approved = "Approved",
  declined = "Declined"
}

@Injectable( {
               providedIn: "root"
             } )
export class EmployeeService {

  employeeChanged = new Subject<Employee[]>();
  employeeServerUrl = "https://employee-managment-f5252.firebaseio.com/employees.json";
  private employees: Employee[] = [];

  constructor( private http: HttpClient ) { }

  getEmployees() {
    return this.employees;
  }

  setEmployees( emps: Employee[] ): void {
    this.employees = emps;
    this.employeeChanged.next( this.employees );
  }

  // Add am employee to the array of employees and store it on the server
  // NOTE: This method will mostly never be called since we will be storing or retreving data when we signup or logout only.

  addEmployee( abv: string, name: string, email: string, isAdmin: boolean, adminStatus: string ) {
    const empId = this.employees ? this.employees.length : 0;
    const admin = adminStatus !== (ADMIN_STATUS.pending || ADMIN_STATUS.declined);
    const emp = new Employee( empId, abv, name, email, isAdmin, ADMIN_STATUS.pending );
    this.employees.push( emp );
    this.employeeChanged.next( this.employees );
    this.storeEmployees();
  }

  changeAdminStatus( name: string, response: string ) {
    const isAdmin = response === ADMIN_STATUS.approved;
    if ( this.employees ) {
      for ( let emp of this.employees ) {
        if ( emp._userName === name ) {
          emp.isAdmin = isAdmin;
          emp._adminStatus = response;
        }
      }
    }
    this.employeeChanged.next( this.employees );
    this.storeEmployees();
  }

  fetchEmployees() {
    this.http.get<Employee[]>( this.employeeServerUrl ).pipe( tap( emps => {this.setEmployees( emps );} ) ).subscribe();
  }

  storeEmployees() {
    const emps = this.getEmployees();
    this.http.put<Employee[]>( this.employeeServerUrl, emps ).subscribe();
  }
}
