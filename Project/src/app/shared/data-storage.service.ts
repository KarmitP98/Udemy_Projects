import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import { map, tap } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";

@Injectable({
              providedIn : "root"
            })
export class DataStorageService {

  serverUrl = "https://recipe-book-a3620.firebaseio.com/recipes.json";

  constructor(private http: HttpClient,
              private recipeService: RecipeService,
              private authService: AuthService) {}


  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put(this.serverUrl, recipes).subscribe(response => {
      console.log(response);
    });
  }

  fetchRecipes() {

    // This means take the value ones and unsubscribe

    return this.http.get<Recipe[]>(this.serverUrl).pipe(
      tap(recipes => {
        console.log(recipes);
        this.recipeService.setRecipes(recipes);
      }),
      map(recipes => {
        return recipes.map(recipe => {
          return {
            ...recipe, ingredients :
              recipe.ingredients ? recipe.ingredients : []
          };
        });
      }));
  }

  getRecipes() {
    let temp: Recipe[] = [];
    this.http.get<Recipe[]>(this.serverUrl).subscribe(recipes => {
      temp = recipes;
    });
    return temp;
  }
}
