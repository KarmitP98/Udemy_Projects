import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { ADMIN_STATUS, EmployeeService } from "../shared/employee.service";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Employee } from "../shared/model/employee.model";

@Component( {
              selector: "app-login",
              templateUrl: "./login.component.html",
              styleUrls: [ "./login.component.css" ]
            } )
export class LoginComponent implements OnInit, OnDestroy {

  @ViewChild( "f", { static: false } ) form: NgForm;
  companyName = "ABC Company";
  isLoginMode: boolean = true;
  admin: boolean = false;
  empSub: Subscription;
  emps: Employee[] = [];

  constructor( private employeeService: EmployeeService, private router: Router, private snackBar: MatSnackBar ) { }

  ngOnInit() {

    this.empSub = this.employeeService.fetchEmployees().subscribe( ( value ) => {
      if ( value ) {
        this.emps = value;
      }
    } );

  }

  ngOnDestroy(): void {
    this.empSub.unsubscribe();
  }

  onSubmit(): void {
    const emp = this.getEmp( this.form.value.email, this.form.value.password );
    const email = this.form.value.email;
    const password = this.form.value.password;
    const abv = this.form.value.abv;
    const isAdmin = this.form.value.isAdmin;
    const name = this.form.value.name;

    if ( this.isLoginMode ) {
      if ( emp ) {
        this.employeeService.login( emp );
      } else {
        this.showError( "Invalid Email / Password !" );
      }
    } else {
      if ( !emp ) {
        const newEmp: Employee = new Employee( this.emps ? this.emps.length : 0, abv, name, email, false, ADMIN_STATUS.pending, password );
        this.employeeService.storeEmployee( newEmp );
        this.employeeService.login( newEmp );
      } else {
        this.showError( "This user already exists !" );
      }
    }
  }

  switchModes(): void {
    this.isLoginMode = !this.isLoginMode;
  }

  // Check if the employee data matches any current employee
  getEmp( email: string, password: string ): Employee {
    if ( this.emps ) {
      for ( let emp of this.emps ) {
        if ( emp !== null ) {
          if ( emp.userEmail === email && emp.password === password ) {
            return emp;
          }
        }
      }
    }
    return null;
  }

  private showError( error: string ): void {
    this.snackBar.open( error, "Close", {
      duration: 2000
    } );
  }

}
