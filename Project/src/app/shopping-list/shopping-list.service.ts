import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";

@Injectable({
              providedIn : "root"
            })
export class ShoppingListService {

  ingridientsChanged = new EventEmitter<Ingredient[]>();

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
    this.ingridientsChanged.emit(this.ingredients.slice());
  }

  addIngrediants(ings: Ingredient[]) {
    // for (let ing of ings) {
    //   this.addIngredient(ing);
    // }  TOO MANY EMITS

    this.ingredients.push(...ings); // ... is spread operator same as Array.asList();
    this.ingridientsChanged.emit(this.ingredients.slice());
  }
}
