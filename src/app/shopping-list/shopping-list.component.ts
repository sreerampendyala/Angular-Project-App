import { Component, OnInit, OnDestroy } from '@angular/core';
import { ingredient } from '../shared/ingredient.model'
import { ShoppingListService } from './shoppingList.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  
  ingredients: ingredient[]
  private igChangedSubject: Subscription
  constructor(private shoppingListService: ShoppingListService) { }

  
  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients()
    this.igChangedSubject = this.shoppingListService.ingredientsChanged.subscribe(
      (ingredients: ingredient[]) => {
         this.ingredients = ingredients 
      }
    )
  }

  ngOnDestroy(): void {
    this.igChangedSubject.unsubscribe()
  }

  itemClicked(i: number) {
    this.shoppingListService.triggerIngredientAtIndex(i)
  }
}
