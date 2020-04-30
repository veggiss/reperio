import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FinnBildetPageRoutingModule } from './finn-bildet-routing.module';

import { FinnBildetPage } from './finn-bildet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FinnBildetPageRoutingModule
  ],
  declarations: [FinnBildetPage]
})
export class FinnBildetPageModule {}
