import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ingredient } from 'src/app/shared/ingredient.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  
  recipe: Recipe
  id: number
  constructor(private recipeService: RecipeService, private route: ActivatedRoute) { 
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id']
        this.recipe = this.recipeService.getRecipeByID(this.id)
      }
    )
  }

  ngOnInit(): void {

  }

  onToShoppingListClicked() {
    this.recipeService.addDetailToShoppingList(this.recipe.ingredients)
  }

}
