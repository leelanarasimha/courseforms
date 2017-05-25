import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {RecipeService} from "../recipe.service";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
    formgroup: FormGroup;
    id: number;
    editMode = false;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          this.initForm();
        }
      );
  }

    onAddIngredient() {
        (<FormArray>this.formgroup.get('ingredients')).push(
            new FormGroup({
                name: new FormControl(null, [Validators.required]),
                amount: new FormControl(null, [Validators.required])
            })
        );
    }

  private initForm() {
      let recipeName = '';
      let recipeImagePath = '';
      let recipeDescription = '';
      let recipeIngredients = new FormArray([]);

      if (this.editMode) {
          const recipe = this.recipeService.getRecipe(this.id);
          recipeName = recipe.name;
          recipeImagePath = recipe.imagePath;
          recipeDescription = recipe.description;
          if (recipe['ingredients']) {
              for (const ingredient of recipe['ingredients']) {
                  recipeIngredients.push(
                      new FormGroup({
                          name: new FormControl(ingredient.name, [Validators.required]),
                          amount: new FormControl(ingredient.amount, [Validators.required]),
                      }));
              }
          }
          this.formgroup = new FormGroup({
              name: new FormControl(recipeName, [Validators.required]),
              description: new FormControl(recipeDescription, [Validators.required]),
              imagePath: new FormControl(recipeImagePath, [Validators.required]),
              ingredients: recipeIngredients
          });

      }
  }

}
