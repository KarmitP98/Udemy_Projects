import { Ingredient } from "../../shared/ingredient.model";
import * as SLA from "./shopping-list.actions";

const initialState = {
  ingredients : [
    new Ingredient("Apples", 5),
    new Ingredient("Tomatoes", 10)
  ]
};

export function shoppingListReducer(state = initialState, action: SLA.ShoppingListActions) {
  switch (action.type) {
    case SLA.ADD_INGREDIENT:
      return {
        ...state,
        ingredients : [...state.ingredients, action.payLoad]
      };
    case SLA.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients : [...state.ingredients, ...action.payLoad]
      };
    case SLA.UPDATE_ING:
      const ing = state.ingredients[action.payLoad.index];
      const updatedIng = {
        ...ing,
        ...action.payLoad.ing
      };
      const updatedIngs = [...state.ingredients];
      updatedIngs[action.payLoad.index] = updatedIng;
      return {
        ...state,
        ingredients : updatedIngs
      };
    case SLA.DELETE_ING:

      return {
        ...state,
        ingredients : state.ingredients.filter((ig, iqIndex) => {
          return iqIndex !== action.payLoad;
        })
      };
    default:
      return state;
  }
}
