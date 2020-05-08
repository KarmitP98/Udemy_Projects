import { Component, OnInit, ViewChild } from "@angular/core";
import { UserService } from "../../services/user.service";
import { ActivatedRoute, Router } from "@angular/router";
import { NgForm } from "@angular/forms";

@Component( {
              selector: "app-login-page",
              templateUrl: "./login-page.component.html",
              styleUrls: [ "./login-page.component.css" ]
            } )
export class LoginPageComponent implements OnInit {

  @ViewChild( "form", { static: false } ) loginForm: NgForm;

  constructor( private usersService: UserService,
               private router: Router,
               private route: ActivatedRoute ) { }

  ngOnInit() {
    console.log( "Login-page created." );
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
}
