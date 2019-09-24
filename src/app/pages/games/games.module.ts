import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GamesPage } from './games.page';
import { GameCardModule } from '../../components/game-card/game-card.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    GameCardModule,
    RouterModule.forChild([{ path: '', component: GamesPage }])
  ],
  declarations: [GamesPage]
})
export class GamesPageModule {}
