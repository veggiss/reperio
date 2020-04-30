import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { XpBarComponent } from './xp-bar.component';

@NgModule({
  declarations: [XpBarComponent],
  exports: [XpBarComponent],
  imports: [
    IonicModule,
    CommonModule
  ]
})
export class XpBarModule { }
