import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { getGame } from '../../services/globals';

@Component({
  selector: 'app-game-info',
  templateUrl: './game-info.page.html',
  styleUrls: ['./game-info.page.scss'],
})
export class GameInfoPage implements OnInit {
	private item:any;

	constructor(private route: ActivatedRoute, private router: Router) { 
		this.route.params.subscribe(params => {
			let game = getGame(parseInt(params['id']));

			if (!game.length) {
				this.router.navigate(['/']);
				throw new Error('Game not found');
			} else {
				this.item = game[0];
			}
		});
	}

	ngOnInit() {
		console.log(this.item);
	}

}
