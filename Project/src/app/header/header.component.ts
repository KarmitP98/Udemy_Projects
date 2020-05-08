import { Component, OnDestroy, OnInit } from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";

@Component({
             selector : "app-header",
             templateUrl : "./header.component.html"
           })
export class HeaderComponent
  implements OnInit, OnDestroy {


  constructor(public dataStorageService: DataStorageService) {}

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
  }

  onSaveRecipes() {
    this.dataStorageService.storeRecipes();
  }

  onFetchRecipes() {
    this.dataStorageService.fetchRecipes().subscribe();
  }
}
