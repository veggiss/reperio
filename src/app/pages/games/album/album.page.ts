import { Component } from '@angular/core';
import {NavController, PopoverController} from '@ionic/angular';
import { GameMenuComponent } from '../../../components/game-menu/game-menu.component';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import * as Phaser from 'phaser';
import { BootScene } from './src/boot.scene';

interface GameInstance extends Phaser.Types.Core.GameConfig {
  instance: Phaser.Game
}

@Component({
  selector: 'app-album',
  templateUrl: './album.page.html',
  styleUrls: ['./album.page.scss'],
})

export class AlbumPage {
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

  constructor(public popoverController: PopoverController, private navCtrl: NavController) {
    //this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE_PRIMARY);
  }

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
