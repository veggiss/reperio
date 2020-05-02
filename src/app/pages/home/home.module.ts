import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { XpBarModule } from '../../components/xp-bar/xp-bar.module';
import { GameCardModule } from '../../components/game-card/game-card.module';
import {HostListenerModule} from "../../services/directive/host-listener.module";
import {MatExpansionModule} from "@angular/material/expansion";

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        XpBarModule,
        GameCardModule,
        MatExpansionModule,
        HostListenerModule,
        RouterModule.forChild([{path: '', component: HomePage}]),
    ],
  declarations: [HomePage]
})
export class HomePageModule {}