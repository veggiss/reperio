import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./components/tabs/tabs.module').then(m => m.TabsPageModule) },
  { path: 'game-info/:id', loadChildren: './pages/game-info/game-info.module#GameInfoPageModule' },
  { path: 'game_1', loadChildren: './pages/games/match/match.module#MatchPageModule' },
  { path: 'game_2', loadChildren: './pages/games/flipper/flipper.module#FlipperPageModule' },
  { path: 'game_3', loadChildren: './pages/games/album/album.module#AlbumPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
