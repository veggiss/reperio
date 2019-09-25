import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { GameMenuComponent } from '../../../components/game-menu/game-menu.component.ts';
import * as Phaser from 'phaser';

const SCENES = {
  FIRST: 'FirstScene',
  SECOND: 'SecondScene'
}

class CommonScene extends Phaser.Scene {
  helloWorld: Phaser.GameObjects.Text

  init () {
    this.cameras.main.setBackgroundColor('#24252A');
  }

  create () {
    this.helloWorld = this.add.text(
      this.cameras.main.centerX, 
      this.cameras.main.centerY, 
      "Hello World", { 
        font: "40px Arial", 
        fill: "#ffffff" 
      }
    );
    this.helloWorld.setOrigin(0.5);

    this.input.keyboard.on('keyup_C', function() {
      this.scene.start(
        this.scene.key === SCENES.FIRST ?
          SCENES.SECOND : SCENES.FIRST
      );
    }, this);
  }

  setAngle (angle: number) {
    this.helloWorld.angle = angle;
  }
}

class FirstScene extends CommonScene {
  update () {
    this.helloWorld.angle += 1;
  }
}

class SecondScene extends CommonScene {
  update () {
    this.helloWorld.angle -= 1;
  }
}

class BootScene extends Phaser.Scene {
  create() {
    this.scene.add(SCENES.FIRST, FirstScene, true);
    this.scene.add(SCENES.SECOND, SecondScene, false);

    this.scene.run(SCENES.FIRST);
  }

  pause() {
    this.scene.pause();
  }
}

interface GameInstance extends Phaser.Types.Core.GameConfig {
  instance: Phaser.Game
}

@Component({
  selector: 'app-match',
  templateUrl: './match.page.html',
  styleUrls: ['./match.page.scss'],
})

export class MatchPage implements OnInit {
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
      if (scene.sys.isActive() && scene instanceof CommonScene) {
        scene.setAngle(0);
      }
    });
  }
}
