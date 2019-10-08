import * as Phaser from 'phaser';
import Polaroid from './sprites/polaroid.sprite';
import Image from './sprites/image.sprite';
import { getMatchImage } from '../../../../services/globals';
import Btn from "./sprites/btn.sprite";


export class MainScene extends Phaser.Scene {
  private category: string = 'mat';
  private state: number = 1;
  private states: any = {
    1: 'loading',
    2: 'guessing'
  };
  
  public roundData: any = getMatchImage(this.category, [], 2.5, 10);
  public round: number = 0;
  public bgSprite: any;
  public polaroid: any;
  public image: any;
  public buttons: any[];

  public setMainState: any = newState => this.state = newState;
  public getMainState: any = () => this.states[this.state];
  public getPolaroid: any = () => this.polaroid;
  public getImage: any = () => this.image;
  public getRound: any = () => this.round;
  public getButtons: any = () => this.buttons;
  public getBtnText: any = index => this.roundData[this.round].alternatives[index];
  public btnIsAnswer: any = index => this.roundData[this.round].alternatives[index] === this.roundData[this.round].answer;

  preload() {
    this.load.image('alternative', 'assets/img/alternative.png');
    this.load.image('background', 'assets/img/games/match/bg.png');
    this.load.image('polaroid', 'assets/img/games/match/polaroid.png');

    this.roundData.forEach((e, i) => this.load.image(`image_${i}`, `assets/img/games/images/${this.category}/${e.src}`));
  }

  init () {
    this.cameras.main.setBackgroundColor('#24252A');
  }

  create () {
    this.bgSprite = this.add.tileSprite(0, 0, this.game.canvas.width * window.devicePixelRatio, this.game.canvas.height * window.devicePixelRatio, 'background');
    this.buttons = this.loadButtons();
    this.polaroid = new Polaroid({scene: this, x: 0, y: 0});
    this.image = new Image({scene: this, x: 0, y: 0});
    
    this.startRound();
    
  }

  update () {
  }
  
  startRound() {
    if (this.round < this.roundData.length) {      
      this.loadTweenChain();
    }
  }
  
  loadTweenChain() {
    let polaroidIn = this.polaroid.tweenIn();
    let imageIn = this.image.tweenIn();
    let buttonsIn = this.buttons.map(btn => btn.tweenIn());
    let correctBtnOut = this.buttons.filter(btn => btn.isAnswer())[0];
    let polaroidOut = this.polaroid.tweenOut();
        
    // .once is used because we only want to trigger the event once,
    // if using .on, the event would stay in memory and trigger on each tween created (even if completed)
    polaroidIn.once('complete', () => imageIn.play());
    imageIn.once('complete', () => buttonsIn.forEach(btn => btn.play()));
    buttonsIn.forEach(btn => btn.once('complete', () => this.state = 2));
    correctBtnOut.once('complete', () => polaroidOut.play());
    polaroidOut.once('complete', () => {
      this.round++;
      
      this.startRound();
    });
    
    polaroidIn.play();
  }
  
  loadButtons() {
    let buttons = [];

    for (let i = 0; i < 4; i++) {
      let y = Math.round(this.cameras.main.centerY + (this.cameras.main.centerY/2));
      if (i > 1)  y = y + Math.round(this.game.canvas.height * 0.12);
      
      let x = i % 2 ? 
          Math.round(this.cameras.main.centerX + (this.cameras.main.centerX/2)) :
          Math.round(this.cameras.main.centerX - (this.cameras.main.centerX/2));

      let button = new Btn({
        scene: this, 
        x: x, 
        y: y, 
        index: i
      });
      
      button.on('answer', (correct, pressedBtn) => {
        if (correct) {
          pressedBtn.tweenCorrect().play();
          pressedBtn.setTint(0x47EB33);
        } else {
          pressedBtn.setTint(0xEB4733);

          this.buttons.forEach(btn => {
            if (btn.isAnswer()) {
              btn.setTint(0x47EB33);
              btn.tweenCorrect().play();
            }
          });
        }

        this.buttons.forEach((btn, i) => {
          if (pressedBtn !== btn && !btn.isAnswer()) btn.tweenOut(200).play();
          else btn.tweenOut(3000).play();
        });
      });
      
      buttons.push(button);
    }

    return buttons;
  }
}