import { Component } from '@angular/core';
import { GAMES_LIST, favorites } from '../../services/globals';
import {AlertController} from "@ionic/angular";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
	public favorites: Array<any>;
	public GAMES_LIST: any = GAMES_LIST;
	public sliderConfig = {
		slidesPerView: 1.2,
		centeredSlides: true
	};

	constructor(public alertController: AlertController) {
		this.favorites = GAMES_LIST.filter(e => favorites.includes(e.id));
	}

	ionViewWillEnter() {
		this.favorites = GAMES_LIST.filter(e => favorites.includes(e.id));
	}
	
	ionViewDidEnter() {
		if (!localStorage.getItem('consent')) this.showConsentForm();
	}
	
	async showConsentForm() {
		const alert = await this.alertController.create({
			backdropDismiss: false,
			header: 'Samtykke til bruk av dine data.',
			message: 'Ved å samtykke gir du oss rett til å bruke dine data til statestikk og forskningsbruk.<br><br><a href="http://www.twitter.com/user123">Link til mer informasjon.</a>',
			buttons: [{
				text: 'Gi samtykke',
				handler: () => {
					alert.dismiss().then(() => localStorage.setItem('consent', Date.now().toString()));
				}
			}]
		});

		await alert.present();
	}
}
