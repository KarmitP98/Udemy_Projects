import { Component, OnInit } from '@angular/core';
import { UsersService } from "../../services/users.service";

@Component( {
              selector: 'app-dashboard-page',
              templateUrl: './dashboard-page.component.html',
              styleUrls: [ './dashboard-page.component.css' ]
            } )
export class DashboardPageComponent implements OnInit {

  constructor( public usersService: UsersService ) { }

  ngOnInit() {
  }

}
