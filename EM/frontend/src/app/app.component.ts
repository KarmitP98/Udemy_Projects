import { Component, OnInit } from "@angular/core";
import { UserService } from "./services/user.service";
import { DataStorageService } from "./services/data-storage.service";

@Component( {
              selector: "app-root",
              templateUrl: "./app.component.html",
              styleUrls: [ "./app.component.css" ]
            } )
export class AppComponent implements OnInit {
  title = "frontend";

  constructor( private dataStorageService: DataStorageService,
               public userService: UserService ) {}

  ngOnInit(): void {

  }

}
