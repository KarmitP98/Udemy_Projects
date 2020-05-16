import { NgModule } from "@angular/core";
import { RecipesComponent } from "./recipes.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RouterModule, Routes } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RecipesResolverService } from "./recipes-resolver.service";
import { SharedModule } from "../shared/shared.module";
import { AuthGuard } from "../auth/auth.guard";

const route: Routes = [
  {
    path : "", component : RecipesComponent, canActivate : [AuthGuard], children : [
      {path : "", component : RecipeStartComponent},
      {path : "new", component : RecipeEditComponent},
      {path : ":id", component : RecipeDetailComponent, resolve : [RecipesResolverService]},
      {path : ":id/edit", component : RecipeEditComponent, resolve : [RecipesResolverService]}
    ]
  }];

@NgModule({
            declarations : [
              RecipesComponent,
              RecipeListComponent,
              RecipeDetailComponent,
              RecipeItemComponent,
              RecipeStartComponent,
              RecipeEditComponent],
            imports : [
              RouterModule.forChild(route),
              ReactiveFormsModule,
              HttpClientModule,
              SharedModule
            ],
            exports : [
              RecipesComponent,
              RecipeListComponent,
              RecipeDetailComponent,
              RecipeItemComponent,
              RecipeStartComponent,
              RecipeEditComponent,
              RouterModule]
          })
export class RecipesModule {}
