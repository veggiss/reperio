import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StatsPage } from './stats.page';
import { MatExpansionModule } from '@angular/material/expansion';
import {StatBarModule} from "../../components/stat-bar/stat-bar.module";
import {FinnOrdetHistoryPage} from "../modals/finn-ordet-history/finn-ordet-history.page";
import { TooltipModule } from 'ng2-tooltip-directive';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    MatExpansionModule,
    TooltipModule,
    RouterModule.forChild([{path: '', component: StatsPage}]),
    StatBarModule
  ],
  declarations: [StatsPage, FinnOrdetHistoryPage],
  entryComponents: [FinnOrdetHistoryPage]
})
export class StatsPageModule {}
