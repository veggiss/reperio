import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { GameMenuComponent } from '../../../components/game-menu/game-menu.component';
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
  initialize = true

  game: GameInstance = {
    width: "100%",
    height: "100%",
    type: Phaser.CANVAS,
    scene: BootScene,
    instance: null
  }

  constructor(public popoverController: PopoverController) {}

  async presentPopover() {
    const popover = await this.popoverController.create({
      component: GameMenuComponent,
      event
    })
    return await popover.present();
  }

  getInstance () {
    return this.game.instance;
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
