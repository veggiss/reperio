import { Component, OnInit, Input } from '@angular/core';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {
	getGame,
	DIFFICULTY,
	GAME_HISTORY,
	getDifficultyPercent,
	PLAYER_STATS,
	getSoundMuted,
	toggleSoundMuted,
	getStatPercent, STATS_LIST, GAMES_LIST
} from '../../services/globals';
import {SmartAudioService} from "../../services/providers/smart-audio.service";

@Component({
  selector: 'app-game-info',
  templateUrl: './game-info.page.html',
  styleUrls: ['./game-info.page.scss'],
})
export class GameInfoPage implements OnInit {
	public item:any;
	public gameList = GAMES_LIST;
	public statPercent = getStatPercent;
	public getSoundMuted: any = getSoundMuted;
	public toggleSoundMuted: any = toggleSoundMuted;
	public statsList = {
		grammatikk: {
			text: 'Grammatikk',
			hex: '#CDB2AB',
			color: 'quinary',
			icon: 'book-outline'
		},
		benevning: {
			text: 'Benevning',
			hex: '#EA526F',
			color: 'secondary',
			icon: 'image-outline'
		},
		semantikk: {
			text: 'Semantikk',
			hex: '#a559f9',
			color: 'quaternary',
			icon: 'share-social-outline'
		},
		hurtighet: {
			text: 'Hurtighet',
			hex: '#FF8A5B',
			color: 'tertiary',
			icon: 'flash-outline'
		},
		auditiv: {
			text: 'Auditiv Forståelse',
			hex: '#f9db64',
			color: 'favorite',
			icon: 'ear-outline'
		}
	};
	public statsKeys = Object.keys(this.statsList);

	constructor(private route: ActivatedRoute, private router: Router, private smartAudio: SmartAudioService) { 
		this.route.params.subscribe(params => {
			let game = getGame(parseInt(params['id']));

			if (!game.length) {
				this.router.navigate(['/']);
				throw new Error('Game not found');
			} else {
				this.item = game[0];
				
				if (PLAYER_STATS.level < this.item.levelReq) {
					this.router.navigate(['/']);
				}
			}
		});
	}

	ngOnInit() {
		this.smartAudio.preload(this.item.soundKey, this.item.soundSrc);
	}

	playSound() {
		this.smartAudio.play(this.item.soundKey);
	}

	ionViewWillLeave() {
		this.stopSound();
	}
	
	stopSound() {
		this.smartAudio.stop(this.item.soundKey);
	}
	
	getDifficulty() {
		return getDifficultyPercent(this.item.id);
	}

	gotoHighscore() {
		if (GAME_HISTORY[this.item.id].length > 0) {
			let data: NavigationExtras = {
				state: {
					data: GAME_HISTORY[this.item.id][GAME_HISTORY[this.item.id].length - 1].data,
					history: true,
					id: this.item.id,
				}
			};

			this.router.navigate(['/score-page'], data);
		}
	}
}
