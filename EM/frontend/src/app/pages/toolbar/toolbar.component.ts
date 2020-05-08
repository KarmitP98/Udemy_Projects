import { Component, OnInit } from "@angular/core";
import { UserService } from "../../services/user.service";
import { Router } from "@angular/router";

@Component( {
              selector: "app-toolbar",
              templateUrl: "./toolbar.component.html",
              styleUrls: [ "./toolbar.component.css" ]
            } )
export class ToolbarComponent implements OnInit {

  constructor( public usersService: UserService,
               private router: Router ) { }

  ngOnInit() {
    console.log(
      "Toolbar Created!\nIs user admin? " + this.usersService.isAdmin() );
  }

  onLogout(): void {
    this.usersService.logout();
    this.router.navigate( [ "/login" ] );
  }
}
