import { Recipe } from './recipe.model';
import { EventEmitter, Injectable } from '@angular/core';
import { ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shoppingList.service';

@Injectable()
export class RecipeService {

    recipeSelected = new EventEmitter<Recipe>()
    
    private recipes: Recipe[] = [
        new Recipe('Panner-Butter Masala',
        'Indian Dishhh',
        'https://www.indianhealthyrecipes.com/wp-content/uploads/2014/11/paneer-butter-masala-recipe-2-500x500.jpg',
        [ new ingredient('Sugar', 50), new ingredient('Red Pepper', 10)])
        ,new Recipe('New Panner-Butter Masala',
        'Indian Dish',
        'https://www.indianhealthyrecipes.com/wp-content/uploads/2014/11/paneer-butter-masala-recipe-2-500x500.jpg',
        [new ingredient('Sugar', 50), new ingredient('Red Pepper', 10)])
      ]

      constructor(private shoppingListService: ShoppingListService ) {

      }

      addDetailToShoppingList(ingredients: ingredient[]) {
        this.shoppingListService.addMultipleIngredients(ingredients)
      }
      getRecipes() {
          return this.recipes.slice()
      }

      getRecipeByID(id: number) {
        return this.recipes[id]
      }

      getIndexOfRecipe(recipe: Recipe) {
        return this.recipes.indexOf(recipe)
      }
      
}