import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from "@angular/core";
import { Ingredient } from "../../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list.service";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";
import { Store } from "@ngrx/store";
import * as ShoppingListActions from "../store/shopping-list.actions";

@Component({
             selector : "app-shopping-edit",
             templateUrl : "./shopping-edit.component.html",
             styleUrls : ["./shopping-edit.component.css"]
           })
export class ShoppingEditComponent
  implements OnInit, OnDestroy {

  @ViewChild("f", {static : false}) form: NgForm;

  sub: Subscription;
  itemIndex: number;
  editMode = false;
  editedItem: Ingredient;

  @Output() ingAdded = new EventEmitter<Ingredient>();

  constructor(private slService: ShoppingListService,
              private store: Store<{ shoppingList: { ingredients: Ingredient[] } }>) {
  }

  ngOnInit() {
    this.sub = this.slService.startedEditing.subscribe(
      (index: number) => {
        this.itemIndex = index;
        this.editMode = true;
        this.editedItem = this.slService.getIngredient(index);
        this.form.setValue({
                             name : this.editedItem.name,
                             amount : this.editedItem.amount
                           });
      }
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  submit(form: NgForm) {
    const value = form.value;
    const newIng = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      // this.slService.updateIngredient(this.itemIndex, newIng);
      this.store.dispatch(new ShoppingListActions.UpdateIngredients({index : this.itemIndex, ing : newIng}));
    }
    else {
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIng));
      // this.slService.addIngredient(newIng);
    }

    this.clear();
  }

  clear() {
    this.form.resetForm();
    this.editMode = false;
  }

  delete() {
    // this.slService.removeIngredient(this.itemIndex);
    this.store.dispatch(new ShoppingListActions.DeleteIngredients(this.itemIndex));
    this.clear();
  }
}
