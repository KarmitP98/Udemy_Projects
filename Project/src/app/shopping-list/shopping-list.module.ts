import { NgModule } from "@angular/core";
import { ShoppingListComponent } from "./shopping-list.component";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { SharedModule } from "../shared/shared.module";

const routes: Routes = [
  {path : "", component : ShoppingListComponent}];

@NgModule({
            declarations : [
              ShoppingListComponent,
              ShoppingEditComponent],
            imports : [
              RouterModule.forChild(routes),
              FormsModule,
              HttpClientModule,
              SharedModule
            ],
            exports : [
              ShoppingListComponent,
              ShoppingEditComponent,
              RouterModule]
            // providers : [LoggingService]
            // This provides a seperate instance for the shopping list components
          })
export class ShoppingListModule {}
