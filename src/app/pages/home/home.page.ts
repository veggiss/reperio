import {Component, OnInit, ViewChild} from '@angular/core';
import {
	GAMES_LIST,
	getDailyGoalsDone, getIsAfatiker,
	GOALS_LIST,
	setIsAfatiker,
	updateGoalDate,
	updateScrollBar
} from '../../services/globals';
import {AlertController, IonSlides, ModalController} from "@ionic/angular";
import {FirebaseService} from "../../services/firebase/firebase.service";
import {NavigationEnd, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {InfoModalPage} from "../modals/info-modal/info-modal.page";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
	@ViewChild('slides', null) slides: IonSlides;
	@ViewChild('ionContent', null) ionContent;
	
	private subscription: Subscription;
	public isAfatiker: boolean = getIsAfatiker();
	public gamesList: any = GAMES_LIST;
	public goalsList: any = GOALS_LIST.list;
	public sumGoals: number = 0;
	public slideBeginning: boolean = true;
	public slideEnd: boolean = false;
	public sliderConfig = {
		slidesPerView: 1.5,
		centeredSlides: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		}
	};

	constructor(public alertController: AlertController, public firebaseService: FirebaseService, private router: Router, public modalController: ModalController) {}

	async ngOnInit() {		
		this.subscription = this.router.events.subscribe((event) => {			
			if (event instanceof NavigationEnd && (event.url === '/tabs/home' || event.url === '/')) {
				this.onEnter();
			}
		});

		this.slides.ionSlideTouchEnd.subscribe(() => {			
			this.updateArrows();
		});
	}

	public async onEnter(): Promise<void> {
		this.sumGoals = getDailyGoalsDone();
		updateGoalDate();
	}

	ionViewDidEnter() {
		updateScrollBar(this.ionContent.el);
		
		if (!localStorage.getItem('consent')) this.showConsentForm();
	}

	async openInfoModal() {
		const modal = await this.modalController.create({
			component: InfoModalPage,
			cssClass: 'info-modal-css'
		});
		
		return await modal.present();
	}

	slidePrev() {
		this.slides.slidePrev();
		this.updateArrows();
	}
	
	slideNext() {
		this.slides.slideNext();
		this.updateArrows();
	}
	
	updateArrows() {
		this.slides.isBeginning().then(is => this.slideBeginning = is);
		this.slides.isEnd().then(is => this.slideEnd = is);
	}
	
	async showConsentForm() {
		const alert = await this.alertController.create({
			backdropDismiss: false,
			header: 'Samtykke til bruk av dine data.',
			message: 'Ved å gi samtykke gir du oss rett til å bruke dine anonyme data til statestikk og forskningsbruk.',
			buttons: [{
				text: 'Gi samtykke',
				handler: () => {
					localStorage.setItem('consent', Date.now().toString());
					this.firebaseService.addConsent();
					this.showQuestion();
				}
			}, {
				text: 'Mer informasjon',
				handler: () => {
					this.openLink('https://drive.google.com/open?id=1RWDu-uT-Xp0ht4EcnIVlcBijMX0AR4Rt');
					
					return false;
				}
			}]
		});

		await alert.present();
	}

	async showQuestion() {
		const alert = await this.alertController.create({
			backdropDismiss: false,
			header: 'Er du person med afasi?',
			buttons: [{
				text: 'NEI',
				handler: () => {
					this.isAfatiker = false;
					setIsAfatiker(false);
					this.firebaseService.disableAnalytics();
					this.openInfoModal();
				}
			}, {
				text: 'JA',
				handler: () => {
					this.isAfatiker = true;
					setIsAfatiker(true);
					this.firebaseService.enableAnalytics();
					this.openInfoModal();
				}
			}]
		});

		await alert.present();
	}

	openLink(link) {
		window.open(link,'_blank');
	}
}
