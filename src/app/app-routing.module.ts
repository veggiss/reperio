import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./components/tabs/tabs.module').then(m => m.TabsPageModule) },
  { path: 'game-info/:id', loadChildren: () => import('./pages/game-info/game-info.module').then( m => m.GameInfoPageModule) },
  { path: 'score-page', loadChildren: () => import('./pages/score-page/score-page.module').then( m => m.ScorePagePageModule) },
  { path: 'game_1', loadChildren: () => import('./pages/games/finn-ordet/finn-ordet.module').then( m => m.FinnOrdetPageModule) },
  { path: 'game_2', loadChildren: () => import('./pages/games/sant-usant/sant-usant.module').then( m => m.SantUsantPageModule) },
  { path: 'game_3', loadChildren: () => import('./pages/games/finn-bildet/finn-bildet.module').then( m => m.FinnBildetPageModule) },
  { path: 'game_4', loadChildren: () => import('./pages/games/ord-deling/ord-deling.module').then( m => m.OrdDelingPageModule) }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
