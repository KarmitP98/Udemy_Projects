import { Component, OnInit } from "@angular/core";
import { UserService } from "../../services/user.service";

@Component( {
              selector: "app-dashboard-page",
              templateUrl: "./dashboard-page.component.html",
              styleUrls: [ "./dashboard-page.component.css" ]
            } )
export class DashboardPageComponent implements OnInit {

  constructor( public usersService: UserService ) { }

  ngOnInit() {
  }

}
