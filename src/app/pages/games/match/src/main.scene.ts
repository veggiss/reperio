import * as Phaser from 'phaser';

export class MainScene extends Phaser.Scene {
  helloWorld: Phaser.GameObjects.Text

  preload() {
    this.load.image('alternative', 'assets/img/alternative.png');
    this.load.image('background', 'assets/img/games/match/bg.png');
    this.load.image('polaroid', 'assets/img/games/match/polaroid.png');
    this.load.image('cat', 'assets/img/cat2.jpg');
  }

  init () {
    this.cameras.main.setBackgroundColor('#24252A');

    this.canvas = this.scale.canvas;
    this.state = 1;
    this.states = {
      1: 'loading',
      2: 'guessing'
    }

    this.guessImage;
  }

  create () {
    this.bgSprite = this.add.tileSprite(0, 0, this.canvas.width * window.devicePixelRatio, this.canvas.height * window.devicePixelRatio, 'background');
    this.polaroid = this.loadPolaroid();
    this.alternatives = this.loadAlternatives();

    this.startGame();
    //this.loadImage();



    //this.helloWorld = this.add.text(
    //  this.cameras.main.centerX, 
    //  this.cameras.main.centerY, 
    //  "Hello World", { 
    //    font: "40px Arial", 
    //    fill: "#ffffff" 
    //  }
    //);
  }

  update () {
    if (this.text && this.alternatives[0].btn) {
      if (this.text.displayWidth > this.alternatives[0].btn.displayWidth) {
        this.text.displayWidth = this.alternatives[0].btn.displayWidth - (this.alternatives[0].btn.displayWidth * 0.1);
        this.text.scaleY = this.text.scaleX;
      }
    }
  }

  loadPolaroid() {
    let polaroid = this.add.image(0, 0, 'polaroid');
    polaroid.displayHeight = this.canvas.height * 0.5;
    polaroid.scaleX = polaroid.scaleY;
    polaroid.setOrigin(0.495, 0.449);
    polaroid.setVisible(false);

    return {
      s: polaroid,
      fromX: 0,
      toX: this.cameras.main.centerX,
      fromY: this.canvas.height + polaroid.displayHeight,
      toY: Math.round((polaroid.displayHeight/2) + (this.canvas.height * 0.05))
    }
  }

  startGame() {
    this.polaroid.s.setVisible(true);
    this.tweens.add({
      targets: this.polaroid.s,
      x: {
        from: this.polaroid.fromX,
        to: this.polaroid.toX
      },
      y: {
        from: this.polaroid.fromY,
        to: this.polaroid.toY
      },
      angle: {
        from: Phaser.Math.Between(100, 250),
        to: Phaser.Math.Between(0, 10)
      },
      ease: 'Cubic.InOut',
      duration: 1000,
      onComplete: () => this.loadImage()
    });
  }

  loadImage() {
    let cat = this.add.image(this.polaroid.s.x, this.polaroid.s.y, 'cat');
    cat.displayHeight = this.canvas.height * 0.4;
    cat.scaleX = cat.scaleY;
    cat.setOrigin(0.5);
    cat.alpha = 0;
    cat.angle = this.polaroid.s.angle;
    
    let tween = this.tweens.add({
      targets: cat,
      alpha: {
        from: 0,
        to: 1
      },
      ease: 'Cubic.InOut',
      duration: 1000,
      onComplete: () => this.alternatives.forEach(a => a.tween.in.play())
    });
  }

  loadAlternatives() {
    let delay = 0;
    let alternatives = [];
    let positions = [];
    let btnScale;

    for (let i = 0; i < 4; i++) {
      let y = Math.round(this.cameras.main.centerY + (this.cameras.main.centerY/2));
      let x;

      if (i % 2)  x = Math.round(this.cameras.main.centerX + (this.cameras.main.centerX/2));
      else        x = Math.round(this.cameras.main.centerX - (this.cameras.main.centerX/2));

      if (i > 1)  y = y + Math.round(this.canvas.height * 0.12);

      positions.push({x: x, y: y});
    }

    positions.forEach(pos => {
      let btn = this.add.image(pos.x, pos.y, 'alternative');
      btn.setOrigin(0.5);
      
      btn.displayWidth = Math.round(this.canvas.width * 0.45);
      btn.displayHeight = Math.round(this.canvas.height * 0.1)
      btnScale = btn.displayWidth;
      btn.scale = 0;

      let tween = {
        in: this.tweens.add({
          targets: btn,
          displayWidth: {
            from: 0,
            to: Math.round(this.canvas.width * 0.45),
          },
          displayHeight: {
            from: 0,
            to: Math.round(this.canvas.height * 0.1),
          },
          ease: 'Back.Out',
          delay: delay += 100
        })
      }

      tween.in.stop();

      alternatives.push({btn: btn, tween: tween});
    });

    let text = this.make.text({
        x: alternatives[0].btn.x,
        y: alternatives[0].btn.y,
        text: 'Katt',
        style: {
            fontSize: '32px',
            fontFamily: 'Arial',
            color: '#000000',
            align: 'center'
        },
        add: true
    });

    text.setOrigin(0.5);

    this.text = text;

    return alternatives;
  }
}