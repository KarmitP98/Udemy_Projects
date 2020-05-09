import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { UserService } from "../../services/user.service";

@Component( {
              selector: "app-signup",
              templateUrl: "./signup.component.html",
              styleUrls: [ "./signup.component.css" ]
            } )
export class SignupComponent implements OnInit {

  @ViewChild( "form", { static: false } ) signupForm: NgForm;
  admin: boolean;

  constructor( private router: Router,
               private userService: UserService ) { }

  ngOnInit() {
  }

  onSubmit(): void {
    const value = this.signupForm.value;
    this.userService.addUser( value.name, value.password, value.gender, value.email, this.admin );
    this.userService.login( value.email, value.password );
    this.router.navigate( [ "/home" ] );
  }
}
