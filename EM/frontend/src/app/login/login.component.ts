import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { EmployeeService } from "../shared/employee.service";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

@Component( {
              selector: "app-login",
              templateUrl: "./login.component.html",
              styleUrls: [ "./login.component.css" ]
            } )
export class LoginComponent implements OnInit, OnDestroy {
  companyName = "ABC Company";
  isLoginMode: boolean = true;
  @ViewChild( "f", { static: false } ) form: NgForm;
  admin: boolean = false;
  error: string = "";
  loadingSub: Subscription;
  isLoading: boolean = false;

  constructor( private employeeService: EmployeeService, private router: Router ) { }

  ngOnInit() {
    this.employeeService.fetchEmployees();
    this.loadingSub = this.employeeService.loadingSubject.subscribe( value => {
      this.isLoading = value;
    } );
  }

  ngOnDestroy(): void {
    this.loadingSub.unsubscribe();
  }

  onSubmit(): void {
    const userExist = this.employeeService.doesMatch( this.form.value.email, this.form.value.password );
    if ( this.isLoginMode ) {
      if ( userExist ) {
        this.employeeService.login( this.form.value.email, this.form.value.password );
      } else {
        this.error = "Invalid Email / Password !";
        setTimeout( () => {this.error = null;}, 2000 );
        // alert( this.error );
      }
    } else {
      if ( userExist ) {
        this.error = "This user already exists !";
        setTimeout( () => {this.error = null;}, 2000 );
      } else {
        this.employeeService.signup( this.form.value.abv, this.form.value.name, this.form.value.email, this.form.value.password,
                                     this.admin );
      }
    }
  }

  switchModes(): void {
    this.isLoginMode = !this.isLoginMode;
    this.error = null;
  }
}
