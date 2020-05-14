import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthResponseData, AuthService } from "./auth.service";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { EmployeeService } from "../shared/employee.service";

@Component( {
              selector: "app-auth",
              templateUrl: "./auth.component.html",
              styleUrls: [ "./auth.component.css" ]
            } )
export class AuthComponent implements OnInit {

  isLoading = false;
  isLoginMode = true;
  error: string = null;
  @ViewChild( "f", { static: false } ) form: NgForm;

  constructor( private authService: AuthService, private router: Router, private employeeService: EmployeeService ) { }

  ngOnInit() {
  }

  public onSubmit(): void {
    if ( !this.form.valid ) {
      return;
    }

    // Extract the email and password value from the form
    const email = this.form.value.email;
    const password = this.form.value.password;

    let abv: string;
    let name: string;
    let isAdmin: boolean;
    let adminStatus: string;

    if ( !this.isLoginMode ) {
      abv = this.form.value.abv;
      name = this.form.value.name;
      isAdmin = this.form.value.isAdmin;
      if ( isAdmin ) {
        adminStatus = "Pending";
      } else {
        adminStatus = "Declined";
      }
    }

    // Observable to subscirbe to the signin or signup and extract the token
    let authObs: Observable<AuthResponseData>;

    // Start loading mode
    this.isLoading = true;

    // Check if we are login or signup
    // if ( this.isLoginMode ) {
    //   // If Login -> Login -> fetchEmployeeData from Server -> Stop loading and start the application
    //   this.authService.login( email, password ).subscribe( userData => {
    //     this.employeeService.fetchEmployees().subscribe( () => {
    //       this.isLoading = false;
    //       this.router.navigate( [ "/home" ] );
    //     } );
    //   } );
    // } else {
    //   // If Signup -> Signup -> Add Employee to the server -> Store the employee -> Load the current employee
    //   this.authService.signUp( email, password ).subscribe( userData => {
    //     this.employeeService.addEmployee( abv, name, email, isAdmin, adminStatus );
    //   } );
    // }

    // Stop laoding and navigate to home page once data or error has been handled
    authObs.subscribe( userData => {
      this.isLoading = false;
    }, errorMsg => {
      this.error = errorMsg;
      this.isLoading = false;
    } );

    this.form.reset();
  }

  onSwitchMode(): void {
    this.isLoginMode = !this.isLoginMode;
  }

  // Clear error message
  private onHandleError() {
    this.error = null;
  }
}
