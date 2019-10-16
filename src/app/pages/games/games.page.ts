import { Component } from '@angular/core';
import { GAMES_LIST } from '../../services/globals';

@Component({
  selector: 'app-games',
  templateUrl: 'games.page.html',
  styleUrls: ['games.page.scss']
})
export class GamesPage {
	public games: any;

	constructor() {
		this.games = {
			lese: GAMES_LIST.filter(e => e.category == 1),
			skrive: GAMES_LIST.filter(e => e.category == 2),
			lytte: GAMES_LIST.filter(e => e.category == 3),
			hjernetrim: GAMES_LIST.filter(e => e.category == 4)
		}
	}
}