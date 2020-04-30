import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { GameInfoPage } from './game-info.page';
import {StatBarModule} from "../../components/stat-bar/stat-bar.module";

const routes: Routes = [
  {
    path: '',
    component: GameInfoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StatBarModule,
    RouterModule.forChild(routes)
  ],
  declarations: [GameInfoPage]
})
export class GameInfoPageModule {}
