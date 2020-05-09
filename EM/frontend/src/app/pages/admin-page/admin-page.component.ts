import { Component, OnInit } from "@angular/core";
import { UserService } from "../../services/user.service";

@Component( {
              selector: "app-admin-page",
              templateUrl: "./admin-page.component.html",
              styleUrls: [ "./admin-page.component.css" ]
            } )
export class AdminPageComponent implements OnInit {

  constructor( public userService: UserService ) { }

  ngOnInit() {
  }

}
