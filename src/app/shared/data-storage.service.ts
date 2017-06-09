
import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {RecipeService} from "../recipes/recipe.service";
import {Recipe} from "../recipes/recipe.model";
import 'rxjs/Rx';
import {AuthService} from "../auth.service";
import {tokenize} from "@angular/compiler/src/ml_parser/lexer";
/**
 * Created by leelanarasimha on 28/05/17.
 */

@Injectable()
export class DataStorageService {
    constructor(private http: Http, private recipeservice: RecipeService, private authservice: AuthService) {}
    saveRecipes() {
        const token = this.authservice.getToken();
        return this.http
            .put('https://ng-recipe-book-e8eeb.firebaseio.com/recipes.json?auth=' + token,
                this.recipeservice.getRecipes());
    }

    getRecipes() {
        const token = this.authservice.getToken();
        this.http
            .get('https://ng-recipe-book-e8eeb.firebaseio.com/recipes.json?auth=' + token)
            .map(
                (response: Response) => {
                    const recipes: Recipe[] = response.json();
                    for ( const recipe of recipes) {
                        if ( ! recipe['ingredients']) {
                            recipe['ingredients'] = [];
                        }
                    }
                    return recipes;
                }
            ).subscribe(
            (recipes: Recipe[]) => {
                this.recipeservice.setRecipes(recipes);
            }
        );

    }
}
