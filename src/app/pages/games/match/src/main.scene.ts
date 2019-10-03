import * as Phaser from 'phaser';
import Polaroid from './sprites/polaroid.sprite';
import Image from './sprites/image.sprite';
import { getMatchImage } from '../../../../services/globals';
import Btn from "./sprites/btn.sprite";

export abstract class MainScene extends Phaser.Scene {
  abstract roundData: any = getMatchImage('food', [], 1, 10);
  public round: number = 0;
  public state: number = 1;
  public states: any = {
    1: 'loading',
    2: 'guessing'
  };
  
  public getState: any;
  public text: any;
  public canvas: any;
  public bgSprite: any;
  public polaroid: any;
  public mainImage: any;
  public alternatives: any[];

  preload() {
    this.load.image('alternative', 'assets/img/alternative.png');
    this.load.image('background', 'assets/img/games/match/bg.png');
    this.load.image('polaroid', 'assets/img/games/match/polaroid.png');

    this.roundData.forEach((e, i) => this.load.image('image_' + i, 'assets/img/games/match/mat/' + e.image.data.src));
  }

  init () {
    this.cameras.main.setBackgroundColor('#24252A');
    this.canvas = this.scale.canvas;
    this.getState = () => this.states[this.state];
  }

  create () {
    this.bgSprite = this.add.tileSprite(0, 0, this.canvas.width * window.devicePixelRatio, this.canvas.height * window.devicePixelRatio, 'background');
    this.alternatives = this.loadAlternatives();
    this.polaroid = new Polaroid({scene: this, x: 0, y: 0});
    this.mainImage = new Image({scene: this, x: 0, y: 0});
    
    this.startTweenChain();
    //this.startRound();
    //this.loadImage();
    //game: string, mainImageegory: string, tags: any, complexity: number
  }

  update () {
  }
  
  startTweenChain () {
    //onComplete: () => {
    //    this.round++;
    //    this.startRound()
    //},
    //onUpdate: () => {
    //    this.mainImage.x = polaroid.x;
    //    this.mainImage.y = polaroid.y;
    //}
 /*
    this.polaroid.tweenOut().on('complete', () => {

    });*/

    this.round++;

    if (this.round < this.roundData.length) {
      this.mainImage.setTexture('image_' + this.round);
      this.alternatives.forEach(b => b.clearTint());
    }
 
    let polaroidTweenIn = this.polaroid.tweenIn();
    
    let imageTweenIn = this.mainImage.tweenIn();
    let alternativesTweenIn = this.alternatives.map(btn => btn.tweenIn());
    
    console.log(alternativesTweenIn);

    imageTweenIn.on('update', () => {
      this.mainImage.angle = this.polaroid.angle;
      this.mainImage.x = this.polaroid.x;
      this.mainImage.y = this.polaroid.y;
    });
    
    imageTweenIn.on('complete', () => {
      console.log("complete");
      alternativesTweenIn.forEach(btn => btn.play());
    });
        
    polaroidTweenIn.on('complete', () => {
      imageTweenIn.play();
    });


    
    polaroidTweenIn.play();
  }
  
  loadAlternatives() {
    let buttons = [];

    for (let i = 0; i < 4; i++) {
      let y = Math.round(this.cameras.main.centerY + (this.cameras.main.centerY/2));
      if (i > 1)  y = y + Math.round(this.canvas.height * 0.12);
      
      let x = i % 2 ? 
          Math.round(this.cameras.main.centerX + (this.cameras.main.centerX/2)) :
          Math.round(this.cameras.main.centerX - (this.cameras.main.centerX/2));

      buttons.push(new Btn({scene: this, x: x, y: y}));
    }

    return buttons;
  }
}