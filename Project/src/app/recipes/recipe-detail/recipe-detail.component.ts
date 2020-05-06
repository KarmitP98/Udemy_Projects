import { Component, OnInit } from "@angular/core";
import { Recipe } from "../recipe.model";
import { ShoppingListService } from "../../shopping-list/shopping-list.service";
import { RecipeService } from "../recipe.service";
import { ActivatedRoute, Params, Router } from "@angular/router";

@Component({
             selector : "app-recipe-detail",
             templateUrl : "./recipe-detail.component.html",
             styleUrls : ["./recipe-detail.component.css"]
           })
export class RecipeDetailComponent
  implements OnInit {

  id: number;
  recipe: Recipe;

  constructor(private recipeService: RecipeService, private shoppingListService: ShoppingListService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params["id"];
        this.recipe = this.recipeService.getRecipe(this.id);
      }
    );
  }

  addToList() {
    this.recipeService.addIngToList(this.recipe.ingredients);
  }

  editRecipe() {
    this.router.navigate(["edit"], {relativeTo : this.route});
  }
}
