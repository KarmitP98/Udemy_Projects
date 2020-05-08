import { Component } from "@angular/core";
import { LoginGaurdService } from "./services/login-gaurd.service";
import { UserService } from "./services/user.service";

@Component( {
              selector: "app-root",
              templateUrl: "./app.component.html",
              styleUrls: [ "./app.component.css" ]
            } )
export class AppComponent {
  title = "frontend";

  constructor( public loginGaurd: LoginGaurdService,
               public userService: UserService ) {}

}
