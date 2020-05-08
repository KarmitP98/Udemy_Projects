import { Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";

@Injectable({
              providedIn : "root"
            })
export class RecipeService {

  recipes: Recipe[] = [];


  // private recipes: Recipe[] = [
  //   // tslint:disable-next-line:max-line-length
  //   new Recipe("Onion",
  //              "This is a test recipe",
  //              "https://image.shutterstock.com/image-photo/red-gold-onions-isolated-on-600w-569575726.jpg",
  //              [new Ingredient("Ing 1.1", 1),
  //               new Ingredient("Ing 1.2", 2)]
  //   ),
  //
  //   // tslint:disable-next-line:max-line-length
  //   new Recipe("Potato",
  //              "Another test recipe",
  //              "https://image.shutterstock.com/image-photo/young-potato-isolated-on-white-600w-630239534.jpg",
  //              [new Ingredient("Ing 2.1", 1),
  //               new Ingredient("Ing 2.2", 2)]
  //   )
  // ];
  recipeChanged = new Subject<Recipe[]>();

  constructor(private shoppingListService: ShoppingListService) {
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes.slice());
  }

  getRecipes(): Recipe[] {
    return this.recipes.slice();
    // You only get a copy and not the actual variable
  }

  addIngToList(ings: Ingredient[]) {
    this.shoppingListService.addIngrediants(ings);
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
  }

}
