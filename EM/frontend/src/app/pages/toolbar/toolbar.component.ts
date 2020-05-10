import { Component, OnInit } from "@angular/core";
import { UserService } from "../../services/user.service";
import { Router } from "@angular/router";
import { DataStorageService } from "../../services/data-storage.service";

@Component( {
              selector: "app-toolbar",
              templateUrl: "./toolbar.component.html",
              styleUrls: [ "./toolbar.component.css" ]
            } )
export class ToolbarComponent implements OnInit {

  constructor( public usersService: UserService,
               private router: Router,
               private dataStorageService: DataStorageService ) { }

  ngOnInit() {
  }

  onLogout(): void {
    this.usersService.logout();
    this.dataStorageService.saveEmployeeInfo();
    this.router.navigate( [ "/login" ] );
  }
}
