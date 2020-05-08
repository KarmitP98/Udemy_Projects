import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { UserService } from "../../services/user.service";
import { User } from "../../user/user.module";

@Component( {
              selector: "app-signup",
              templateUrl: "./signup.component.html",
              styleUrls: [ "./signup.component.css" ]
            } )
export class SignupComponent implements OnInit {

  @ViewChild( "form", { static: false } ) signupForm: NgForm;

  constructor( private router: Router,
               private userService: UserService ) { }

  ngOnInit() {
  }

  onSubmit(): void {
    const value = this.signupForm.value;
    const newUser = new User( value.name, value.password, 3, value.email, true, false );
    this.userService.addUser( newUser );
    this.userService.login( value.email, value.password );
    this.router.navigate( [ "/home" ] );
  }
}
