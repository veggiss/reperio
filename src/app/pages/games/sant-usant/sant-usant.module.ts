import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SantUsantPageRoutingModule } from './sant-usant-routing.module';

import { SantUsantPage } from './sant-usant.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SantUsantPageRoutingModule
  ],
  declarations: [SantUsantPage]
})

export class SantUsantPageModule {}


