import { CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FlipperPage } from './flipper.page';
//import { GameMenuComponent } from "../../../components/game-menu/game-menu.component";

const routes: Routes = [
  {
    path: '',
    component: FlipperPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FlipperPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FlipperPageModule {}
