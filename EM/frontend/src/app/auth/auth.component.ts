import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthResponseData, AuthService } from "./auth.service";
import { Router } from "@angular/router";
import { Observable } from "rxjs";

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

  constructor( private authService: AuthService, private router: Router ) { }

  ngOnInit() {
  }

  public onSubmit(): void {
    if ( !this.form.valid ) {
      return;
    }

    // Extract the email and password value from the form
    const email = this.form.value.email;
    const password = this.form.value.password;

    // Observable to subscirbe to the signin or signup and extract the token
    let authObs: Observable<AuthResponseData>;

    // Start loading mode
    this.isLoading = true;

    if ( this.isLoginMode ) {
      authObs = this.authService.login( email, password );
    } else {
      authObs = this.authService.signUp( email, password );
    }

    // Stop laoding and navigate to home page once data or error has been handled
    authObs.subscribe( userData => {
      this.isLoading = false;
      this.router.navigate( [ "/home" ] );
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
