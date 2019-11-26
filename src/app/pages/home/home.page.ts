import { Component } from '@angular/core';
import { GAMES_LIST, favorites } from '../../services/globals';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
	public favorites: Array<any>;

	constructor() {
		this.favorites = GAMES_LIST.filter(e => favorites.includes(e.id));
	}

	ionViewWillEnter() {
		this.favorites = GAMES_LIST.filter(e => favorites.includes(e.id));
	}
}
