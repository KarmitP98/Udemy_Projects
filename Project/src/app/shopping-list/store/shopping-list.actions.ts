import { Action } from "@ngrx/store";
import { Ingredient } from "../../shared/ingredient.model";

export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const ADD_INGREDIENTS = "ADD_INGREDIENTS";
export const UPDATE_ING = "UPDATE_ING";
export const DELETE_ING = "DELETE_ING";

export class AddIngredient
  implements Action {
  readonly type = ADD_INGREDIENT;

  constructor(public payLoad: Ingredient) {}

}

export class AddIngredients
  implements Action {
  readonly type = ADD_INGREDIENTS;

  constructor(public payLoad: Ingredient[]) {}

}

export class UpdateIngredients
  implements Action {
  readonly type = UPDATE_ING;

  constructor(public payLoad: { index: number, ing: Ingredient }) {}

}

export class DeleteIngredients
  implements Action {
  readonly type = DELETE_ING;

  constructor(public payLoad: number) {}

}

export type ShoppingListActions = AddIngredient | AddIngredients | UpdateIngredients | DeleteIngredients;
