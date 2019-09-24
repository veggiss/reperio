import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { XpBarComponent } from './xp-bar.component';

@NgModule({
  declarations: [XpBarComponent],
  exports: [XpBarComponent],
  imports: [
    IonicModule,
    CommonModule,
    NgCircleProgressModule.forRoot({
      radius: 60,
      space: -10,
      outerStrokeWidth: 10,
      outerStrokeColor: "#4882c2",
      innerStrokeColor: "#e7e8ea",
      innerStrokeWidth: 10,
      animateTitle: true,
      animationDuration: 1000,
      showUnits: true,
      showBackground: false,
      startFromZero: false,
      showSubtitle: false
    })
  ]
})
export class XpBarModule { }
