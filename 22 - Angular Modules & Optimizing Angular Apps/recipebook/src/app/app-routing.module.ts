import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  {
    path: 'recipes',
    loadChildren: () =>
      import('./recipes/recipes.module').then(module => module.RecipesModule)
  },
  {
    path: 'shopping-list',
    loadChildren: () =>
      import('./shopping-list/shopping-list.module').then(
        module => module.ShoppingListModule
      )
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.module').then(module => module.AuthModule)
  }
  // { path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule' }
  // Older than angular 9
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })
    //preload as soon as possible, possibly in idle time when user is browsing page
  ],
  exports: [RouterModule]
  })
  //.forRoot declares the route for the root component,
  //.forChild declared the route for the child component
  //We must export this module, as all modules work individually,
  //and without exporting modules will not be able to talk to each other

  //The components declared in this module, will not be available to other module.
  //The routes we provide here, the modules we imported in app module, all break
export class AppRoutingModule {}
