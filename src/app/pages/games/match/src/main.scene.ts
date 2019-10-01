import * as Phaser from 'phaser';

export class MainScene extends Phaser.Scene {
  helloWorld: Phaser.GameObjects.Text

  preload() {
    this.load.image('alternative', 'assets/img/alternative.png');
  }

  init () {
    this.cameras.main.setBackgroundColor('#24252A');
    this.canvas = this.sys.game.canvas;
  }

  create () {
    this.load.image('cat', 'assets/img/cat2.jpg');
    this.load.start();

    this.load.on('complete', () => {
      let cat = this.add.image(this.cameras.main.centerX, 0, 'cat');
      cat.displayHeight = this.canvas.height * 0.4;
      cat.scaleX = cat.scaleY;
      cat.y = Math.round((cat.displayHeight/2) + (this.canvas.height * 0.05));
      cat.setOrigin(0.5);
      
      let tween = this.tweens.add({
        targets: cat,
        scale: {
          from: 0,
          to: cat.scale
        },
        ease: 'Sine.easeInOut',
        duration: 300,
      });
    });



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
   
  }
}