import { Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";

@Injectable({
              providedIn : "root"
            })
export class ShoppingListService {

  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

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
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngrediants(ings: Ingredient[]) {
    // for (let ing of ings) {
    //   this.addIngredient(ing);
    // }  TOO MANY EMITS

    this.ingredients.push(...ings); // ... is spread operator same as Array.asList();
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  getIngredient(i: number): Ingredient {
    return this.ingredients[i];
  }

  updateIngredient(i: number, newIng: Ingredient) {
    this.ingredients[i] = newIng;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  removeIngredient(i: number) {
    this.ingredients.splice(i, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
