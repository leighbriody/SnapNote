import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModuleTopicsPageRoutingModule } from './module-topics-routing.module';

import { ModuleTopicsPage } from './module-topics.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModuleTopicsPageRoutingModule
  ],
  declarations: [ModuleTopicsPage]
})
export class ModuleTopicsPageModule {}
