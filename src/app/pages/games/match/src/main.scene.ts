import * as Phaser from 'phaser';
import { getMatchImage } from '../../../../services/globals';

export class MainScene extends Phaser.Scene {
  roundData: any = getMatchImage('food', [], 1, 10);
  round: number = 0;
  getState: any;
  text: any;
  states: any;
  canvas: any;
  state: number;
  getState: any;
  bgSprite: any;
  polaroid: any;
  mainImage: any;
  alternatives: any;

  preload() {
    this.load.image('alternative', 'assets/img/alternative.png');
    this.load.image('background', 'assets/img/games/match/bg.png');
    this.load.image('polaroid', 'assets/img/games/match/polaroid.png');

    this.roundData.forEach((e, i) => this.load.image('image_' + i, 'assets/img/games/match/mat/' + e.image.data.src));
  }

  init () {
    this.cameras.main.setBackgroundColor('#24252A');
    this.canvas = this.scale.canvas;
    this.state = 1;
    let states = {
      1: 'loading',
      2: 'guessing'
    }
    this.getState = () => states[this.state];
  }

  create () {
    this.bgSprite = this.add.tileSprite(0, 0, this.canvas.width * window.devicePixelRatio, this.canvas.height * window.devicePixelRatio, 'background');
    this.polaroid = this.loadPolaroid();
    this.alternatives = this.loadAlternatives();
    this.mainImage = this.loadImage();
    this.startRound();
    //this.loadImage();
    //game: string, mainImageegory: string, tags: any, complexity: number
  }

  update () {
  }

  startRound() {
    console.log("starting round");
    if (this.round < this.roundData.length) {
      this.mainImage.setTexture('image_' + this.round);
      this.alternatives.forEach(b => b.clearTint()); 
      this.polaroid.tween.in.restart();
    }
  }

  loadPolaroid() {
    let polaroid = this.add.image(0, 0, 'polaroid');
    polaroid.displayHeight = this.canvas.height * 0.5;
    polaroid.scaleX = polaroid.scaleY;
    polaroid.setOrigin(0.495, 0.449);
    polaroid.setVisible(false);

    polaroid.tween = {
      in: this.tweens.add({
        targets: polaroid,
        x: {
          from: () => Phaser.Math.Between(0, this.canvas.width),
          to: this.cameras.main.centerX
        },
        y: {
          from: this.canvas.height + polaroid.displayHeight,
          to: Math.round((polaroid.displayHeight/2) + (this.canvas.height * 0.05))
        },
        angle: {
          from: () => Phaser.Math.Between(100, 250),
          to: () => Phaser.Math.Between(0, 10)
        },
        ease: 'Cubic.InOut',
        duration: 1000,
        onStart: () => polaroid.setVisible(true),
        onComplete: () => this.mainImage.tween.in.play()
      }),
      out: this.tweens.add({
        targets: polaroid,
        x: {
          start: this.cameras.main.centerX,
          from: this.cameras.main.centerX,
          to: -this.canvas.width
        },
        ease: 'Cubic.InOut',
        duration: 500,
        onComplete: () => {
          this.round++;
          this.startRound()
        },
        onUpdate: () => {
          this.mainImage.x = polaroid.x;
          this.mainImage.y = polaroid.y;
        }
      }).stop()
    }

    return polaroid;
  }

  loadImage() {
    let image = this.add.image(0, 0, 'image_' + this.round);
    image.displayHeight = this.canvas.height * 0.4;
    image.scaleX = image.scaleY;
    image.setOrigin(0.5);
    image.tween = {};
    image.alpha = 0;

    image.tween.in = this.tweens.add({
      targets: image,
      alpha: {
        from: 0,
        to: 1
      },
      ease: 'Cubic.InOut',
      duration: 500,
      onUpdate: () => {
        image.angle = this.polaroid.angle;
        image.x = this.polaroid.x;
        image.y = this.polaroid.y;
      },
      onComplete: () => this.alternatives.forEach(btn => btn.tween.in.play())
    }).stop();

    return image;
  }

  loadAlternatives() {
    let alternatives = this.roundData[this.round].alternatives;
    let delay = 0;
    let buttons = [];
    let positions = [];
    let btnScale;

    for (let i = 0; i < alternatives.length; i++) {
      let y = Math.round(this.cameras.main.centerY + (this.cameras.main.centerY/2));
      let x;

      if (i % 2)  x = Math.round(this.cameras.main.centerX + (this.cameras.main.centerX/2));
      else        x = Math.round(this.cameras.main.centerX - (this.cameras.main.centerX/2));

      if (i > 1)  y = y + Math.round(this.canvas.height * 0.12);

      positions.push({x: x, y: y});
    }

    positions.forEach((pos, i) => {
      let btn = this.add.image(pos.x, pos.y, 'alternative');
      let text = this.make.text({
          x: btn.x,
          y: btn.y,
          text: this.roundData[this.round].alternatives[i],
          style: {
              fontSize: '48px',
              fontFamily: 'Arial',
              color: '#000000',
              align: 'center'
          },
          add: true
      });

      btn.displayWidth = Math.round(this.canvas.width * 0.45);
      btn.displayHeight = Math.round(this.canvas.height * 0.1);
      btn.setInteractive();
      btn.setOrigin(0.5);
      text.setOrigin(0.5);
      btn.scale = 0;
      text.scale = 0;

      let isAnswer = () => text.text == this.roundData[this.round].answer;
      let updateTextPos = () => {
        if (text.displayWidth >= btn.displayWidth) {
          text.displayWidth = btn.displayWidth - (btn.displayWidth * 0.1);
          text.scaleY = text.scaleX;
        } else {
          text.scale = btn.scale;
        }
      }

      btn.tween = {
        in: this.tweens.add({
          targets: btn,
          displayWidth: {
            start: 0,
            from: 0,
            to: Math.round(this.canvas.width * 0.45)
          },
          displayHeight: {
            start: 0,
            from: 0,
            to: Math.round(this.canvas.height * 0.1)
          },
          ease: 'Back.Out',
          delay: delay += 100,
          duration: 500,
          onActive: () => {
            btn.alpha = 1;
            text.alpha = 1;
            text.text = this.roundData[this.round].alternatives[i];
          },
          onUpdate: () => updateTextPos(),
          onComplete: () => {
            this.state = 2;
          }
        }).stop(),
        out: this.tweens.add({
          targets: [btn, text],
          alpha: {
            start: 1,
            from: 1,
            to: 0
          },
          ease: 'Cubic.Out',
          delay: 2500,
          duration: 500,
          onComplete: () => {
            if (isAnswer()) this.polaroid.tween.out.restart();
          }
        }).stop()
      }

      btn.on('pointerdown', () => {
        if (this.getState() == 'guessing') {
          this.state = 1;
          this.alternatives.forEach(btn => btn.tween.out.play());

          if (isAnswer()) btn.setTint(0x47EB33);
          else btn.setTint(0xEB4733);
        }
      });

      buttons.push(btn);
    });

    return buttons;
  }
}