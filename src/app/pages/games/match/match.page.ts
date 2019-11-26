import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { GameMenuComponent } from '../../../components/game-menu/game-menu.component';
import { NavController } from '@ionic/angular';
import * as Phaser from 'phaser';
import { BootScene } from './src/boot.scene';

interface GameInstance extends Phaser.Types.Core.GameConfig {
  instance: Phaser.Game
}

@Component({
  selector: 'app-match',
  templateUrl: './match.page.html',
  styleUrls: ['./match.page.scss'],
})

export class MatchPage {
  initialize = true;

  game: GameInstance = {
    width: "100%",
    height: "100%",
    type: Phaser.WEBGL,
    scene: BootScene,
    instance: null,
    fps: {
      target: 60,
      min: 60,
      forceSetTimeOut: true﻿
    }
  };

  constructor(public popoverController: PopoverController, private navCtrl: NavController) {}

  async presentPopover() {
    const popover = await this.popoverController.create({
      component: GameMenuComponent
    });
    return await popover.present();
  }

  getInstance () {
    return this.game.instance;
  }

  goBack() {
    this.navCtrl.back();
  }

  pauseGame() {
    const instance = this.getInstance();
    instance.scene.pause('FirstScene');
  }

  changeAngle () {
    const instance = this.getInstance();
    instance.scene.scenes.forEach(scene => {
      if (scene.sys.isActive()) {
        scene.setAngle(0);
      }
    });
  }
}
