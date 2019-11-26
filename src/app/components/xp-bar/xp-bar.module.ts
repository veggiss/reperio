import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { XpBarComponent } from './xp-bar.component';
import { PLAYER_STATS } from '../../services/globals'

@NgModule({
  declarations: [XpBarComponent],
  exports: [XpBarComponent],
  imports: [
    IonicModule,
    CommonModule,
    NgCircleProgressModule.forRoot({
      radius: 25,
      space: -5,
      outerStrokeWidth: 5,
      outerStrokeColor: "#31AFB4",
      innerStrokeColor: "#e7e8ea",
      innerStrokeWidth: 5,
      showBackground: false,
      animateTitle: false,
      showTitle: false,
      showUnits: false,
      showSubtitle: false
    })
  ]
})
export class XpBarModule { }
