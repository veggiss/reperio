import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./components/tabs/tabs.module').then(m => m.TabsPageModule) },
  { path: 'game-info/:id', loadChildren: './pages/game-info/game-info.module#GameInfoPageModule' },
  { path: 'score-page', loadChildren: './pages/score-page/score-page.module#ScorePagePageModule' },
  { path: 'game_1', loadChildren: './pages/games/finn-ordet/finn-ordet.module#FinnOrdetPageModule' },
  { path: 'game_2', loadChildren: './pages/games/ord-deling/ord-deling.module#OrdDelingPageModule' },
  { path: 'game_3', loadChildren: () => import('./pages/games/sant-usant/sant-usant.module').then( m => m.SantUsantPageModule) },
  { path: 'game_4', loadChildren: () => import('./pages/games/finn-bildet/finn-bildet.module').then( m => m.FinnBildetPageModule)
  },


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}