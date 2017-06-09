import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {RecipeService} from "../recipe.service";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {Recipe} from "../recipe.model";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
    formgroup: FormGroup;
    subscription: Subscription;
    id: number;
    editMode = false;

  constructor(private router: Router, private route: ActivatedRoute, private recipeService: RecipeService) { }

  ngOnInit() {
    this.subscription = this.route.params
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
      const recipeIngredients = new FormArray([]);


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
      }
      this.formgroup = new FormGroup({
          name: new FormControl(recipeName, [Validators.required]),
          description: new FormControl(recipeDescription, [Validators.required]),
          imagePath: new FormControl(recipeImagePath, [Validators.required]),
          ingredients: recipeIngredients
      });
  }

  onSubmit(event) {
      event.preventDefault();
      if (this.editMode) {
          this.recipeService.updateRecipe(this.id, this.formgroup.value);
      } else {
          this.recipeService.addRecipe(this.formgroup.value);
      }

      this.cancelForm();
  }

    cancelForm() {
      this.router.navigate(['/recipes']);
    }

    onDeleteIngredient(index: number) {
        (<FormArray>this.formgroup.get('ingredients')).removeAt(index);
    }

    ngOnDestroy() {
      this.subscription.unsubscribe();
    }


}
