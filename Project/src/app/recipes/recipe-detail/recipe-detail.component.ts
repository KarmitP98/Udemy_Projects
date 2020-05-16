import { Component, OnInit } from "@angular/core";
import { Recipe } from "../recipe.model";
import { ShoppingListService } from "../../shopping-list/shopping-list.service";
import { RecipeService } from "../recipe.service";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Ingredient } from "../../shared/ingredient.model";
import * as SLA from "../../shopping-list/store/shopping-list.actions";

@Component({
             selector : "app-recipe-detail",
             templateUrl : "./recipe-detail.component.html",
             styleUrls : ["./recipe-detail.component.css"]
           })
export class RecipeDetailComponent
  implements OnInit {

  id: number;
  recipe: Recipe;

  constructor(private recipeService: RecipeService,
              private shoppingListService: ShoppingListService,
              private route: ActivatedRoute,
              private router: Router,
              private store: Store<{ shoppingList: { ingredients: Ingredient[] } }>) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params["id"];
        this.recipe = this.recipeService.getRecipe(this.id);
      }
    );
  }

  addToList() {
    this.store.dispatch(new SLA.AddIngredients(this.recipe.ingredients));
    // this.recipeService.addIngToList(this.recipe.ingredients);
  }

  editRecipe() {
    this.router.navigate(["edit"], {relativeTo : this.route});
  }

  deleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.navigateBack();
  }

  navigateBack() {
    this.router.navigate(["../"], {relativeTo : this.route});
  }

}
