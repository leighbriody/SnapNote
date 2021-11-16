import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/Inbox',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'modules',
    loadChildren: () => import('./modules/modules.module').then( m => m.ModulesPageModule)
  },
  {
    path: 'module-topics',
    loadChildren: () => import('./module-topics/module-topics.module').then( m => m.ModuleTopicsPageModule)
  },
  {
    path: 'module-topics/:id',
    loadChildren: () => import('./module-topics/module-topics.module').then( m => m.ModuleTopicsPageModule)
  },
 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
