import * as Phaser from 'phaser';
import Cardbg from "./sprites/cardbg.sprite";


export class MainScene extends Phaser.Scene {
  private cardbgUpper: Cardbg;
  private cardbgDowner: Cardbg;
  private bgSprite: Phaser.GameObjects.TileSprite;

  preload() {
    this.load.image('alternative', 'assets/img/alternative.png');
    this.load.image('card_bgr', 'assets/img/games/flipper/card_bgr.png');
    this.load.image('wood_bgr', 'assets/img/games/flipper/wood_bgr.png');
    this.load.image('coffee_cup', 'assets/img/games/flipper/coffee_cup.png');
    this.load.image('card', 'assets/img/games/flipper/card.png');
  }

  init () {
    this.cameras.main.setBackgroundColor('#24252A');
  }

  create () {
    this.bgSprite = this.add.tileSprite(0, 0, this.game.canvas.width * window.devicePixelRatio, this.game.canvas.height * window.devicePixelRatio, 'wood_bgr');
    //this.bgSprite.displayHeight = this.game.canvas.width;
    this.cardbgUpper = new Cardbg({scene: this, upper: true});
    this.cardbgDowner = new Cardbg({scene: this, upper: false});
  }

  update () {
  }
}