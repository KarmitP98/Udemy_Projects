import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { DataStorageService } from "../shared/data-storage.service";

@Component( {
              selector: "app-header",
              templateUrl: "./header.component.html",
              styleUrls: [ "./header.component.css" ]
            } )
export class HeaderComponent implements OnInit, OnDestroy {

  public isAdmin: boolean = false;
  isAuth: boolean = false;
  private userSub: Subscription;

  constructor( public dataStorageService: DataStorageService, private authService: AuthService ) { }

  ngOnInit() {
    this.userSub = this.authService.user.subscribe( user => {
      this.isAuth = !!user;
    } );
  }

  onLogout(): void {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
