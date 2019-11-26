import * as Phaser from "phaser";
import { shuffle } from '../../../../../services/globals';
import { correctDifficulty } from '../../../../../services/globals';

export default class Book extends Phaser.GameObjects.Sprite {
  public image: any;
  private scaleText: (text) => void;
  private spacer: Phaser.GameObjects.Text;
  private textBgLeft: Phaser.GameObjects.Sprite;
  private textBgRight: Phaser.GameObjects.Sprite;
  private correctAltBoxes: any;
  constructor(props) {
    super(props.scene, 0, 0, 'book_open');
    
    this.x = this.scene.cameras.main.centerX;
    this.y = this.scene.cameras.main.centerY;
    this.setOrigin(0.5, 0.5);    
    
    let gameWidth = props.scene.game.canvas.width;
    let gameHeight = props.scene.game.canvas.height;
    
    this.displayWidth = gameWidth * 0.9;
    this.scaleY = this.scaleX;
    
    if (this.displayHeight > gameHeight * 0.9) {
      this.displayHeight = gameHeight * 0.9;
      this.scaleX = this.scaleY;
    }

    props.scene.add.existing(this);
    
    this.correctAltBoxes = [];
    
    this.image = props.scene.add.sprite(0, 0,'test_image');
    
    this.image.displayWidth = this.displayWidth * 0.25;
    this.image.scaleY = this.image.scaleX;
    this.image.x = this.x - (this.displayWidth * 0.25);
    this.image.y = this.y - (this.displayHeight * 0.25);

    this.textBgLeft = props.scene.add.sprite(this.image.x, 0, null);
    this.textBgLeft.setOrigin(0.5, 0.5);
    this.textBgLeft.displayWidth = this.displayWidth * 0.4;
    this.textBgLeft.displayHeight = this.displayHeight * 0.4;
    this.textBgLeft.y = this.image.y + (this.displayWidth * 0.275);
    this.textBgLeft.visible = false;

    this.textBgRight = props.scene.add.sprite(this.x + (this.displayWidth / 4.5), this.y - (this.displayHeight / 4), null);
    this.textBgRight.setOrigin(0.5, 0.5);
    this.textBgRight.displayWidth = this.textBgLeft.displayWidth;
    this.textBgRight.displayHeight = this.textBgLeft.displayHeight;
    this.textBgRight.visible = false;

    this.scaleText = text => {
      text.displayHeight = this.textBgLeft.displayHeight / 5;
      text.scaleX = text.scaleY;
    };

    this.spacer = this.scene.make.text({
      add: false,
      x: (this.textBgLeft.x - (this.textBgLeft.displayWidth / 2)),
      y: (this.textBgLeft.y - (this.textBgLeft.displayHeight / 2)),
      alpha: 0,
      origin: 0,
      text: " ",
      style: {
        fontSize: '48px',
        fontFamily: 'Arial',
        color: '#000000',
        align: 'center',
      }
    });

    this.scaleText(this.spacer);

    this.leftAlternatives(props);
    this.rightAlternatives(props);
    
    return this;
  }
  
  leftAlternatives(props) {
    let sepX = 0;
    let sepY = 0;
    let textIndex = 0;
    
    props.data.sentence.split(' ').forEach(e => {
      let isGuessWord = false;
      let textString;

      if (e == "_") {
        isGuessWord = true;
        //textString = props.data.correct[textIndex++].split('').map(e => e = '_').join('') + " ";
        textString = props.data.correct[textIndex++];
      } else {
        textString = e;
      }

      let text = this.scene.make.text({
        x: (this.textBgLeft.x - (this.textBgLeft.displayWidth / 2)) + sepX,
        y: (this.textBgLeft.y - (this.textBgLeft.displayHeight / 2)) + sepY,
        origin: 0,
        text: textString,
        style: {
          fontSize: '48px',
          fontFamily: 'Arial',
          color: '#000000',
          align: 'center',
        }
      });

      this.scaleText(text);

      if ((sepX + text.displayWidth) > this.textBgLeft.displayWidth) {
        sepX = 0;
        sepY += text.displayHeight + (text.displayHeight / 2);

        text.y = (this.textBgLeft.y - (this.textBgLeft.displayHeight / 2)) + sepY;
        text.x = (this.textBgLeft.x - (this.textBgLeft.displayWidth / 2)) + sepX;
      }

      if (isGuessWord) {
        let altBoxText = props.scene.add.sprite(text.x, text.y,'alternative');
        altBoxText.setOrigin(0);
        altBoxText.displayWidth = text.displayWidth;
        altBoxText.displayHeight = text.displayHeight;
        altBoxText.word = text.text;

        this.correctAltBoxes.push(altBoxText);
      }

      sepX += text.displayWidth + this.spacer.displayWidth;
    });
  }
  
  rightAlternatives(props) {
    let alternatives = shuffle(props.data.correct.concat(props.data.wrong));
    let underlines = [];
    let wrongAnswers = 0;
    let sepX = 0;
    let sepY = 0;

    alternatives.forEach(e => {
      let text: any = this.scene.make.text({
        x: (this.textBgRight.x - (this.textBgRight.displayWidth / 2)) + sepX,
        y: (this.textBgRight.y - (this.textBgRight.displayHeight / 2)) + sepY,
        guessed: false,
        origin: 0,
        text: e,
        style: {
          border: '10px solid black',
          fontSize: '48px',
          fontFamily: 'Arial',
          color: '#000000',
          align: 'center',
        }
      });
      
      text.setInteractive();

      this.scaleText(text);

      if ((sepX + text.displayWidth) > this.textBgRight.displayWidth) {
        sepX = 0;
        sepY += text.displayHeight + (text.displayHeight / 2);

        text.y = (this.textBgRight.y - (this.textBgRight.displayHeight / 2)) + sepY;
        text.x = (this.textBgRight.x - (this.textBgRight.displayWidth / 2)) + sepX;
      }

      let underline = props.scene.add.graphics();
      underline.lineStyle(3, '#000000');
      underline.moveTo(text.x, text.y + (text.displayHeight/2));
      underline.lineTo(text.x + text.displayWidth, text.y + (text.displayHeight/2));
      underline.strokePath();
      underline.alpha = 0;
      underlines.push(underline);

      text.on('pointerdown', () => {
        let clickedWord = text.text;
        let correctWord = this.correctAltBoxes[0].word;
  
        if (!text.guessed) {
          if (clickedWord == correctWord) {
            text.setColor('green');
            this.correctAltBoxes[0].alpha = 0;
            this.correctAltBoxes.shift();
            text.guessed = true;
            underlines.forEach(e => e.alpha = 0);
            
            if (this.correctAltBoxes.length == 0) {
              correctDifficulty(3, wrongAnswers, 'skrive');
              document.getElementById("goBackBtn").click();
            }            
          } else {
            wrongAnswers++;
            underline.alpha = 1;
          }
        }
      });

      sepX += text.displayWidth + this.spacer.displayWidth;
    });
  }
}