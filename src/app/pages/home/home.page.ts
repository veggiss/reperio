import {Component, ViewChild} from '@angular/core';
import { GAMES_LIST } from '../../services/globals';
import {AlertController, IonSlides} from "@ionic/angular";
import {FirebaseService} from "../../services/firebase/firebase.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
	@ViewChild('slides', null) slides: IonSlides;
	public GAMES_LIST: any = GAMES_LIST;
	public sliderConfig = {
		slidesPerView: 1.5,
		centeredSlides: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		}
	};

	constructor(public alertController: AlertController, public firebaseService: FirebaseService) {}
	
	ionViewDidEnter() {
		if (!localStorage.getItem('consent')) this.showConsentForm();
	}

	slidePrev() {
		this.slides.slidePrev();
	}
	slideNext() {
		this.slides.slideNext();
	}
	
	async showConsentForm() {
		const alert = await this.alertController.create({
			backdropDismiss: false,
			header: 'Samtykke til bruk av dine data.',
			message: 'Ved å samtykke gir du oss rett til å bruke dine data til statestikk og forskningsbruk.<br><br><a href="http://www.twitter.com/user123">Link til mer informasjon.</a>',
			buttons: [{
				text: 'Gi samtykke',
				handler: () => {
					alert.dismiss().then(() => {
						localStorage.setItem('consent', Date.now().toString());
						this.firebaseService.addConsent();
					});
				}
			}]
		});

		await alert.present();
	}
	
	openSurvey() {
		window.open("https://www.survey-xact.dk/LinkCollector?key=5WS2U9W6S2CJ",'_system', 'location=yes');
	}
}
