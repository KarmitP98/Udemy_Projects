import { Component, OnDestroy, OnInit } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "./shopping-list.service";
import { Observable } from "rxjs";
import { LoggingService } from "../logging.service";
import { Store } from "@ngrx/store";

@Component({
             selector : "app-shopping-list",
             templateUrl : "./shopping-list.component.html",
             styleUrls : ["./shopping-list.component.css"]
           })
export class ShoppingListComponent
  implements OnInit, OnDestroy {

  ingredients: Observable<{ ingredients: Ingredient[] }>;

  // private sub: Subscription;

  constructor(private shoppingListService: ShoppingListService,
              private loggingService: LoggingService,
              private store: Store<{ shoppingList: { ingredients: Ingredient[] } }>) {
  }

  ngOnDestroy(): void {
    // this.sub.unsubscribe();
  }

  ngOnInit() {
    this.ingredients = this.store.select("shoppingList");
    // this.ingredients = this.shoppingListService.getIngredients();
    // this.sub = this.shoppingListService.ingredientsChanged.subscribe(
    //   (ing: Ingredient[]) => {
    //     this.ingredients = ing;
    //   }
    // );

    this.loggingService.log("Shopping List ngOnInit");
  }


  onEditItem(i: number): void {
    this.shoppingListService.startedEditing.next(i);
  }
}
