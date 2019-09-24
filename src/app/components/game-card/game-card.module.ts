import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { GameCardComponent } from './game-card.component';


@NgModule({
  declarations: [GameCardComponent],
  exports: [GameCardComponent],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class GameCardModule { }
