import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { RecipeService } from "../recipe.service";
import { Recipe } from "../recipe.model";

@Component({
             selector : "app-recipe-edit",
             templateUrl : "./recipe-edit.component.html",
             styleUrls : ["./recipe-edit.component.css"]
           })
export class RecipeEditComponent
  implements OnInit {

  id: number;
  editMode: boolean;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute
    , private recipeService: RecipeService,
              private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params["id"];
        this.editMode = params["id"] != null;
        console.log(this.editMode);
        this.initForm();
      }
    );
  }

  onSubmit() {
    const value = this.recipeForm.value;
    const newRecipe = new Recipe(value["name"],
                                 value["desc"],
                                 value["imagePath"],
                                 value["ingredients"]);
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, newRecipe); // Alternate Aproach
    }
    else {
      this.recipeService.addRecipe(newRecipe);
    }
    this.navigateBack();
  }

  getControls() { // a getter!
    return (<FormArray>this.recipeForm.get("ingredients")).controls;
  }

  addIngredient() {
    (<FormArray>this.recipeForm.get("ingredients"))
      .push(
        new FormGroup({
                        "name" : new FormControl(null, Validators.required),
                        "amount" : new FormControl(null, [Validators.required,
                                                          Validators.pattern(/^[1-9]+[0-9]*$/)])
                      }
        ));
  }

  removeIngredient(i: number) {
    (<FormArray>this.recipeForm.get("ingredients")).removeAt(i);
  }

  navigateBack() {
    this.router.navigate(["../"], {relativeTo : this.route});
  }

  private initForm() {
    let recipeName = "";
    let recipeImgPath = "";
    let recipeDesc = "";
    const ingredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImgPath = recipe.imgPath;
      recipeDesc = recipe.desc;
      if (recipe["ingredients"]) {
        for (const ing of recipe.ingredients) {
          ingredients.push(
            new FormGroup({
                            "name" : new FormControl(ing.name, Validators.required),
                            "amount" : new FormControl(ing.amount, [Validators.required,
                                                                    Validators.pattern(/^[1-9]+[0-9]*$/)])
                          })
          );
        }
      }
    }

    this.recipeForm =
      new FormGroup({
                      "name" : new FormControl(recipeName, Validators.required),
                      "imagePath" : new FormControl(recipeImgPath, Validators.required),
                      "desc" : new FormControl(recipeDesc, Validators.required),
                      "ingredients" : ingredients
                    });
  }
}
