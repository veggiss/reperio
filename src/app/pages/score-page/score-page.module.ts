import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ScorePagePage } from './score-page.page';
import {XpBarModule} from "../../components/xp-bar/xp-bar.module";

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
    RouterModule.forChild(routes)
  ],
  declarations: [ScorePagePage]
})
export class ScorePagePageModule {}
