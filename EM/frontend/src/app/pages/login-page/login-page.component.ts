import { Component, OnInit } from '@angular/core';
import { UsersService } from "../../services/users.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component( {
              selector: 'app-login-page',
              templateUrl: './login-page.component.html',
              styleUrls: [ './login-page.component.css' ]
            } )
export class LoginPageComponent implements OnInit {

  constructor( private usersService: UsersService, private router: Router, private route: ActivatedRoute ) { }

  ngOnInit() {
    console.log( "Login-page created." );
  }

  login( id: number ): void {
    this.usersService.login( id );
    console.log( "User clicked login." );
    this.router.navigate( [ '/dashboard' ] );
  }
}
