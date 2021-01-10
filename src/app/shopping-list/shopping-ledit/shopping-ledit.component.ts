import { Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import { ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shoppingList.service';

@Component({
  selector: 'app-shopping-ledit',
  templateUrl: './shopping-ledit.component.html',
  styleUrls: ['./shopping-ledit.component.css']
})
export class ShoppingLeditComponent implements OnInit {

  @ViewChild('ingredientName', {static: false}) ingredientInputRef: ElementRef
  @ViewChild('ingredientAmount', {static: false}) ingredientAmountInputRef: ElementRef

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
  }
  
  onAdd() {
    const detail = new ingredient(this.ingredientInputRef.nativeElement.value, this.ingredientAmountInputRef.nativeElement.value)
    this.shoppingListService.addIngredient(detail)
  }

  onDelete() {

  }

  onClear() {

  }
}
