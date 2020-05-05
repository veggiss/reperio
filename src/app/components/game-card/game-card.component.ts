import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import {PLAYER_STATS} from "../../services/globals";
import {AlertController} from "@ionic/angular";

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss'],
})
export class GameCardComponent implements OnInit {
	@Input() item:any;
	public playerLevel: number;

	constructor(private router : Router, public alertController: AlertController) {}

	ngOnInit() {}
	
	isAboveLevelReq() {
		return PLAYER_STATS.level >= this.item.levelReq;
	}

	async presentAlertMultipleButtons() {
		const alert = await this.alertController.create({
			message: `Du må være nivå ${this.item.levelReq} for å spille dette spillet.`,
			buttons: ['Ok']
		});

		await alert.present();
	}

	go(id) {
		if (this.isAboveLevelReq()) this.router.navigate(['game-info', id]);
		else this.presentAlertMultipleButtons();
	}
}
