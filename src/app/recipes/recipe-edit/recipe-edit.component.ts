import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number
  isEdit: boolean = false
  recipeEditForm: FormGroup


  constructor(private route: ActivatedRoute, private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id']
        this.isEdit = params['id'] != null 
        this.initForm()
      }
    )
  }

  private initForm() {
    let recipeName = ''
    let imgURL = ''
    let description = ''
    let ingredients = new FormArray([])

    if(this.isEdit) {
      let recipe = this.recipeService.getRecipeByID(this.id)
      recipeName = recipe.name
      imgURL = recipe.imagePath
      description = recipe.description
      if (recipe['ingredients']) {
        recipe.ingredients.forEach(ingd => {
          ingredients.push(
            new FormGroup({
              'name': new FormControl(ingd.name, [Validators.required]),
              'amount': new FormControl(ingd.amount, [Validators.required, Validators.pattern(/^[0-9]+[0=9]+$/)])
            })
          )
        });
      }
    }
    this.recipeEditForm = new FormGroup({
      'name': new FormControl(recipeName, [Validators.required]),
      'imagePath': new FormControl(imgURL, [Validators.required]),
      'description': new FormControl(description, [Validators.required]),
      'ingredients': ingredients 
    })
  }

  onNewIngredient() {
    (this.recipeEditForm.get('ingredients') as FormArray).push(
      new FormGroup({
        'name': new FormControl(null, [Validators.required]),
        'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]+[0=9]+$/)])
      })
    )
  }

  getControls() {
    return (this.recipeEditForm.get('ingredients') as FormArray).controls
  }

  onSubmit() {

  }

  onCancelClick() {

  }
}
