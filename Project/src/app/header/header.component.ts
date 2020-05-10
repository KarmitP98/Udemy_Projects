import { Component, OnDestroy, OnInit } from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";

@Component({
             selector : "app-header",
             templateUrl : "./header.component.html"
           })
export class HeaderComponent
  implements OnInit, OnDestroy {


  public isAuth = false;
  private userSub: Subscription;

  constructor(public dataStorageService: DataStorageService,
              private authService: AuthService) { }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuth = !!user;
    });
  }

  onSaveRecipes() {
    this.dataStorageService.storeRecipes();
  }

  onFetchRecipes() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogout() {
    this.authService.logout();
  }
}
