import { ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingListService {
    ingredientsChanged = new Subject<ingredient[]>()
    ingredientClickedToEdit = new Subject<number>()

    private ingredients: ingredient[] = [
        new ingredient( 'Butter', 10),
        new ingredient( 'Paneer', 40)
      ];

    getIngredients() {
        return this.ingredients.slice()
    }

    clearList() {
      this.ingredients = []
      this.ingredientsChanged.next(this.ingredients.slice())
    }
    
    changeIngredientAtIndex(index: number, ingredient: ingredient) {
      this.ingredients[index] = ingredient
      this.ingredientsChanged.next(this.ingredients.slice())
    }

    triggerIngredientAtIndex(index: number) {
      this.ingredientClickedToEdit.next(index)
    }

    deleteIngredient(index: number) {
      this.ingredients.splice(index, 1)
      this.ingredientsChanged.next(this.ingredients.slice())
    }

    addIngredient(newIngredient: ingredient) {
        this.ingredients.push(newIngredient)
        this.ingredientsChanged.next(this.ingredients.slice())
    }

    addMultipleIngredients(ingredients: ingredient[]) {
        this.ingredients.push(...ingredients)
        this.ingredientsChanged.next(this.ingredients.slice())
    }
} 