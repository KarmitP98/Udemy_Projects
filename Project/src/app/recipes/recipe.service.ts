import { Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";

@Injectable({
              providedIn : "root"
            })
export class RecipeService {

  private recipes: Recipe[] = [
    // tslint:disable-next-line:max-line-length
    new Recipe("Onion",
               "This is a test recipe",
               "https://image.shutterstock.com/image-photo/red-gold-onions-isolated-on-600w-569575726.jpg",
               [new Ingredient("Ing 1.1", 1),
                new Ingredient("Ing 1.2", 2)]
    ),

    // tslint:disable-next-line:max-line-length
    new Recipe("Potato",
               "Another test recipe",
               "https://image.shutterstock.com/image-photo/young-potato-isolated-on-white-600w-630239534.jpg",
               [new Ingredient("Ing 2.1", 1),
                new Ingredient("Ing 2.2", 2)]
    )
  ];

  constructor(private shoppingListService: ShoppingListService) {
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
}
