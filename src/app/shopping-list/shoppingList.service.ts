import { ingredient } from '../shared/ingredient.model';
import { EventEmitter } from '@angular/core';

export class ShoppingListService {
    ingredientsChanged = new EventEmitter<ingredient[]>()
    private ingredients: ingredient[] = [
        new ingredient( 'Butter', 10),
        new ingredient( 'Paneer', 40)
      ];

    getIngredients() {
        return this.ingredients.slice()
    }

    addIngredient(newIngredient: ingredient) {
        this.ingredients.push(newIngredient)
        this.ingredientsChanged.emit(this.ingredients.slice())
    }

    addMultipleIngredients(ingredients: ingredient[]) {
        this.ingredients.push(...ingredients)
        this.ingredientsChanged.emit(this.ingredients.slice())
    }
} 