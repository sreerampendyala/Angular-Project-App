import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { HomePageComponent } from './home-page/home-page.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';

const appRoutes: Routes = [
    {path: '', component: HomePageComponent},
    {path: 'recipes', component: RecipesComponent, children: [
        {path: '', component: HomePageComponent},
        {path: ':id', component: RecipeDetailComponent}
    ]},
    {path: 'shoppingList', component: ShoppingListComponent}
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class RoutingModule {}