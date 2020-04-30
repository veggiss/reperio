import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'app-finn-ordet-history',
  templateUrl: './finn-ordet-history.page.html',
  styleUrls: ['./finn-ordet-history.page.scss'],
})
export class FinnOrdetHistoryPage implements OnInit {
  @Input() gameData: any;

  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }

  async closeModal() {
    await this.modalController.dismiss();
  }

  getDifficulty(difficulty) {
    let label;

    if (difficulty == 1) label = 'Lett';
    else if (difficulty == 2) label = 'Medium';
    else if (difficulty == 3) label = 'Vanskelig';
    else label = 'Ingen data';

    return label;
  }
}
