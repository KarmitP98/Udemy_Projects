import { Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";

@Injectable({
              providedIn : "root"
            })
export class ShoppingListService {

  ingridientsChanged = new Subject<Ingredient[]>();

  private ingredients: Ingredient[] = [
    new Ingredient("Apples", 5),
    new Ingredient("Tomatoes", 10)
  ];

  constructor() {
  }

  getIngredients(): Ingredient[] {
    return this.ingredients.slice();
  }

  addIngredient(ing: Ingredient) {
    this.ingredients.push(ing);
    this.ingridientsChanged.next(this.ingredients.slice());
  }

  addIngrediants(ings: Ingredient[]) {
    // for (let ing of ings) {
    //   this.addIngredient(ing);
    // }  TOO MANY EMITS

    this.ingredients.push(...ings); // ... is spread operator same as Array.asList();
    this.ingridientsChanged.next(this.ingredients.slice());
  }
}
