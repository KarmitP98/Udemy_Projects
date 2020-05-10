import { Component, OnInit, ViewChild } from "@angular/core";
import { UserService } from "../../services/user.service";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { DataStorageService } from "../../services/data-storage.service";

@Component( {
              selector: "app-login-page",
              templateUrl: "./login-page.component.html",
              styleUrls: [ "./login-page.component.css" ]
            } )
export class LoginPageComponent implements OnInit {

  @ViewChild( "form", { static: false } ) loginForm: NgForm;

  constructor( private usersService: UserService,
               private router: Router,
               private dataStorageService: DataStorageService ) { }

  ngOnInit() {
    setTimeout( () => {
      this.dataStorageService.fetchEmployeeInfo();
    }, 500 );
  }

  onSubmit(): void {
    let loggedIn: boolean;
    loggedIn = this.usersService.login( this.loginForm.value.email, this.loginForm.value.password );
    if ( loggedIn ) {
      this.router.navigate( [ "/home" ] );
    }
  }

  goTo(): void {
    this.router.navigate( [ "/signup" ] );
  }

  autoLogin( admin: boolean ): void {
    let loggedIn: boolean;
    if ( admin ) {
      loggedIn = this.usersService.login( "admin1@admin.com", "admin1" );
    } else {
      loggedIn = this.usersService.login( "test1@test.com", "test1" );
    }
    if ( loggedIn ) {
      this.router.navigate( [ "/home" ] );
    }
  }
}
