import { Component, OnInit, ViewChild } from "@angular/core";
import { EmployeeService } from "../shared/employee.service";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

@Component( {
              selector: "app-login",
              templateUrl: "./login.component.html",
              styleUrls: [ "./login.component.css" ]
            } )
export class LoginComponent implements OnInit {
  companyName = "ABC Company";
  isLoginMode: boolean = true;
  @ViewChild( "f", { static: false } ) form: NgForm;
  admin: boolean = false;

  constructor( private employeeService: EmployeeService, private router: Router ) { }

  ngOnInit() {
    this.employeeService.fetchEmployees();
  }

  onSubmit(): void {
    if ( this.isLoginMode ) {
      const userExist = this.employeeService.doesMatch( this.form.value.email, this.form.value.password );
      if ( userExist ) {
        this.employeeService.login( this.form.value.email, this.form.value.password );
        // this.router.navigate( [ "/home" ] );
      }
    } else {
      const userExist = this.employeeService.doesMatch( this.form.value.email, this.form.value.password );
      if ( !userExist ) {
        console.log( this.admin );
        this.employeeService.signup( this.form.value.abv, this.form.value.name, this.form.value.email, this.form.value.password,
                                     this.admin );

      }
    }
  }

  switchModes(): void {
    this.isLoginMode = !this.isLoginMode;
    console.log( this.isLoginMode );
  }
}
