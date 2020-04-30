import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FinnBildetPage } from './finn-bildet.page';

const routes: Routes = [
  {
    path: '',
    component: FinnBildetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FinnBildetPageRoutingModule {}
