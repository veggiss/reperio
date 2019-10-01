import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MatchPage } from './match.page';
import { GameMenuComponent } from '../../../components/game-menu/game-menu.component';

const routes: Routes = [
  {
    path: '',
    component: MatchPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  entryComponents: [GameMenuComponent],
  declarations: [MatchPage, GameMenuComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MatchPageModule {}
