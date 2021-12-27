import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shoppingList.service';

@Component({
  selector: 'app-shopping-ledit',
  templateUrl: './shopping-ledit.component.html',
  styleUrls: ['./shopping-ledit.component.css']
})
export class ShoppingLeditComponent implements OnInit, OnDestroy {

  shoppingListEdit: FormGroup;
  isClickedIngredient: Boolean = false

  private shoppingListItemClicked: Subscription
  private ing: ingredient
  private ind: number

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.shoppingListEdit = new FormGroup({
      'ingredientName': new FormControl(null, [Validators.required]),
      'ingredientAmount': new FormControl(null, [Validators.required, this.checkNumber])
    });

    this.shoppingListItemClicked = this.shoppingListService.ingredientClickedToEdit.subscribe((index) => {
      this.isClickedIngredient = true
      this.ind = index
      this.ing = this.shoppingListService.getIngredients()[index]
      this.shoppingListEdit.setValue({
        'ingredientName': this.ing.name,
        'ingredientAmount': this.ing.amount
      })
    })
  }

  ngOnDestroy(): void {
    this.shoppingListItemClicked.unsubscribe()
  }

  onSubmit() {
    if(!this.isClickedIngredient) {
      const detail = new ingredient(this.shoppingListEdit.get('ingredientName').value, this.shoppingListEdit.get('ingredientAmount').value)
      this.shoppingListService.addIngredient(detail)
    } else {
      this.shoppingListService.changeIngredientAtIndex(this.ind, new ingredient(
        this.shoppingListEdit.get('ingredientName').value, 
        this.shoppingListEdit.get('ingredientAmount').value
      ))
      this.isClickedIngredient = false
    }
    this.shoppingListEdit.reset()
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.ind)
    this.onClear()
  }

  onClear() {
    this.shoppingListEdit.reset()
    this.isClickedIngredient = false
  }

  checkNumber(control: FormControl): {[s: string]: boolean} {
    if (Number.isNaN(control.value)) {
      return {'invalidFormat': true}
    } else return null
  }
}
