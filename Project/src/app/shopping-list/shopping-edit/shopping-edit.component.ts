import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from "@angular/core";
import { Ingredient } from "../../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list.service";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";

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

  constructor(private slService: ShoppingListService) {
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
      this.slService.updateIngredient(this.itemIndex, newIng);
    }
    else {
      this.slService.addIngredient(newIng);
    }
    this.clear();
  }

  clear() {
    this.form.resetForm();
    this.editMode = false;
  }

  delete() {
    this.slService.removeIngredient(this.itemIndex);
    this.clear();
  }
}
