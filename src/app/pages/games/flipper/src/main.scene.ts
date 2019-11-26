import * as Phaser from 'phaser';
import ImageCardbg from "./sprites/image-card-bg.sprite";
import {difficulty, getFlipperImage, shuffle} from "../../../../services/globals";
import ImageCard from "./sprites/image-card.sprite";
import WordCard from "./sprites/word-card.sprite";
import ImageCardBg from "./sprites/image-card-bg.sprite";
import WordCardBg from "./sprites/word-card-bg.sprite";


export class MainScene extends Phaser.Scene {
  private category: string = 'musikk';
  private round = 0;
  private rounds = 1;  
  private bgSprite: Phaser.GameObjects.TileSprite;
  private roundData: any = getFlipperImage(this.category, [], 3, this.rounds * 4);
  private imageCardBg: ImageCardBg;
  private wordCardBg: WordCardBg;
  public imageCards: any[] = [];
  public wordCards: any[] = [];
  public states = ["animating", "idle", "guessing_image", "guessing_word"];
  public state = this.states[0];
  public cardsAnswered = 0;
  public lastClickedElement;
  public answer;
  
  public getState = () => this.state;
  public setState = state => this.state = state;
  public setAnswer = answer => this.answer = answer;
  public getAnswer = () => this.answer;
  public checkCardsAnswers = () => {
    this.cardsAnswered++;
    
    if (this.cardsAnswered == 4) {
      this.round++;
      this.cardsAnswered = 0;
      
      if (this.round < this.rounds) {
        this.roundData.splice(0, 4);

        this.imageCards = [];
        this.wordCards = [];

        this.loadImageCards();
      } else {
        document.getElementById("goBackBtn").click();
      }
    }
  };
  
  public setLastClicked = element => this.lastClickedElement = element;
  public getLastClicked = () => this.lastClickedElement;
  
  preload() {
    this.load.image('alternative', 'assets/img/alternative.png');
    this.load.image('card_bgr', 'assets/img/games/flipper/card_bgr.png');
    this.load.image('wood_bgr', 'assets/img/games/flipper/wood_bgr.png');
    this.load.image('paper_bgr', 'assets/img/games/flipper/paper_bgr.png');
    this.load.image('coffee_cup', 'assets/img/games/flipper/coffee_cup.png');
    this.load.image('card', 'assets/img/games/flipper/card.png');
    this.load.image('bg_tile', 'assets/img/games/flipper/bg_tile.png');
    this.roundData.forEach((e, i) => this.load.image(`image_${i}`, `assets/img/games/images/vost/${e.src}`));
  }

  init () {
    this.cameras.main.setBackgroundColor('#E9E1CF');
    console.log(this.roundData);
  }

  create () {
    this.bgSprite = this.add.tileSprite(0, 0, this.game.canvas.width * window.devicePixelRatio, this.game.canvas.height * window.devicePixelRatio, 'bg_tile');
    this.loadImageCards();
  }
  
  loadImageCards() {
    this.imageCardBg = new ImageCardBg({scene: this});
    this.wordCardBg = new WordCardBg({scene: this});

    let i = 0;
    for (let posY = 1; posY <= 2; posY++) {
      for (let posX = 1; posX <= 2; posX++) {
        let cardUpper = new ImageCard({scene: this, parent: this.imageCardBg, upper: true, posX: posX, posY: posY, image: 'image_' + ((this.round * this.rounds) + i), answer: this.roundData[i].answer, pos: i});
        this.imageCards.push(cardUpper);

        i++;
      }
    }

    shuffle(this.imageCards).forEach((e, i) => {
      let cardUnder = new WordCard({scene: this, parent: this.wordCardBg, pos: i, text: e.answer});
      this.wordCards.push(cardUnder);
    });
    
    let imageCardTweenIn = this.imageCards.map(e => e.tweenIn());
    let wordCardTweenIn = this.wordCards.map(e => e.tweenIn());
    imageCardTweenIn.forEach(btn => btn.once('complete', () => this.state = this.states[1]));

    imageCardTweenIn.forEach(e => e.play());
    wordCardTweenIn.forEach(e => e.play());
  }
  
  flipImageCards(open) {
    this.state = open ? this.states[2] : this.states[1];

    this.imageCards.forEach(e => {
      if (e.active) {
        if (open) {
          if (!e.flipped) e.flip().play();
        } else {
          if (e.flipped) e.flip().play();
        }
      }
    });
  }

  flipWordCards(open) {
    this.state = open ? this.states[3] : this.states[1];

    this.wordCards.forEach(e => {
      if (e.active) {
        if (open) {
          if (!e.flipped) e.flip().play();
        } else {
          if (e.flipped) e.flip().play();
        }
      }
    });
  }

  update () {
  }
}