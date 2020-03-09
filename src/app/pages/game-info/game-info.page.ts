import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { getGame, difficulty, favorites, addToFavorites } from '../../services/globals';

@Component({
  selector: 'app-game-info',
  templateUrl: './game-info.page.html',
  styleUrls: ['./game-info.page.scss'],
})
export class GameInfoPage implements OnInit {
	public item:any;
	public favoriteColor:string;
	public favoritesList:any = favorites;

	constructor(private route: ActivatedRoute, private router: Router) { 
		this.route.params.subscribe(params => {
			let game = getGame(parseInt(params['id']));

			if (!game.length) {
				this.router.navigate(['/']);
				throw new Error('Game not found');
			} else {
				this.item = game[0];
			}

			this.favoriteColor = favorites.includes(this.item.id) ? 'favorite' : 'medium';
		});
	}

	ngOnInit() {
	}

	getComplexity() {
		return Math.round( difficulty * 10) / 10;
	}

	addFavorite() {
		let icon = document.getElementById('favorite_element');
		let added = addToFavorites(this.item.id);
		this.favoriteColor = added ? 'favorite' : 'medium';
	}

	go() {
		this.router.navigate([`game_${this.item.id}`]);
	}
}
