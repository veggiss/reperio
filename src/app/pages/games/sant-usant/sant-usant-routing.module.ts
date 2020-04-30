import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SantUsantPage } from './sant-usant.page';

const routes: Routes = [
  {
    path: '',
    component: SantUsantPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SantUsantPageRoutingModule {}
