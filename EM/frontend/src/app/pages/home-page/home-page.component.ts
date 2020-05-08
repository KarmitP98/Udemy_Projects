import { Component, OnInit } from '@angular/core';
import { UsersService } from "../../services/users.service";

@Component( {
              selector: 'app-home-page',
              templateUrl: './home-page.component.html',
              styleUrls: [ './home-page.component.css' ]
            } )
export class HomePageComponent implements OnInit {

  constructor( public usersService: UsersService ) { }

  ngOnInit() {
  }

}
