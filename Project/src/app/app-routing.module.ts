import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {path : "", redirectTo : "/recipes", pathMatch : "full"},
  {
    path : "recipes", loadChildren : () => import("./recipes/recipes.module").then(mod => mod.RecipesModule)
  },
  {
    path : "shopping-list", loadChildren : () => import("./shopping-list/shopping-list.module").then(mod => mod.ShoppingListModule)
  },
  {
    path : "auth", loadChildren : () => import("./auth/auth.module").then(mod => mod.AuthModule)
  }
];

@NgModule({
            declarations : [],
            imports : [RouterModule.forRoot(routes, {preloadingStrategy : PreloadAllModules}),
                       CommonModule
            ],
            exports : [RouterModule]
          })
export class AppRoutingModule {}