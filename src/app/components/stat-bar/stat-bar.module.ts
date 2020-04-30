import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { StatBarComponent } from './stat-bar.component';

@NgModule({
    declarations: [StatBarComponent],
    exports: [StatBarComponent],
    imports: [
        IonicModule,
        CommonModule
    ]
})
export class StatBarModule { }
