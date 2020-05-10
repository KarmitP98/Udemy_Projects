import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { AppRoutingModule } from "./app-routing/app-routing.module";
import { HttpClientModule } from "@angular/common/http";
import { RecipesModule } from "./recipes/recipes.module";
import { ShoppingListModule } from "./shopping-list/shopping-list.module";
import { SharedModule } from "./shared/shared.module";
import { CoreModule } from "./core.module";
import { AuthModule } from "./auth/auth.module";

@NgModule({
            declarations : [
              AppComponent,
              HeaderComponent
            ],
            imports : [
              BrowserModule,
              AppRoutingModule,
              HttpClientModule,
              RecipesModule,
              ShoppingListModule,
              SharedModule,
              CoreModule,
              AuthModule
            ],
            bootstrap : [AppComponent]
          })
export class AppModule {
}
