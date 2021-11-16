import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModuleTopicsPage } from './module-topics.page';

const routes: Routes = [
  {
    path: '',
    component: ModuleTopicsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModuleTopicsPageRoutingModule {}
