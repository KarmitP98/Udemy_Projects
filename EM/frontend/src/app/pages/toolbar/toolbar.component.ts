import { Component, OnInit } from '@angular/core';
import { UsersService } from "../../services/users.service";

@Component( {
              selector: 'app-toolbar',
              templateUrl: './toolbar.component.html',
              styleUrls: [ './toolbar.component.css' ]
            } )
export class ToolbarComponent implements OnInit {

  constructor( public usersService: UsersService ) { }

  ngOnInit() {
    console.log(
      "Toolbar Created!\nIs user admin? " + this.usersService.isAdmin() );
  }

}
