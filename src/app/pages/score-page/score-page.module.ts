import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ScorePagePage } from './score-page.page';
import {XpBarModule} from "../../components/xp-bar/xp-bar.module";
import {StatBarModule} from "../../components/stat-bar/stat-bar.module";
import {MatExpansionModule} from "@angular/material/expansion";
import {GameCardModule} from "../../components/game-card/game-card.module";

const routes: Routes = [
  {
    path: '',
    component: ScorePagePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    XpBarModule,
    StatBarModule,
    MatExpansionModule,
    GameCardModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ScorePagePage]
})
export class ScorePagePageModule {}
