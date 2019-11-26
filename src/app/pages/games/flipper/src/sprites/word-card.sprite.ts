import * as Phaser from "phaser";

export default class WordCard extends Phaser.GameObjects.Sprite {
  private parent: any;
  private firstCell: { y: number };
  private pos: number;
  private scaleText: () => void;
  private text: any;
  public killme: () => void;
  private tweenIn: () => Phaser.Tweens.Tween;
  private flip: () => Phaser.Tweens.Tween;
  private flipBack: () => Phaser.Tweens.Tween;
  public flipped: boolean;
  private originScaleX: number;
  private originScaleY: number;

  constructor(props) {
    super(props.scene, 0, 0, 'card');

    props.scene.add.existing(this);

    this.setOrigin(0.5, 0.5);
    
    this.pos = props.pos;
    this.parent = props.parent;
    this.setInteractive();
    this.displayWidth = this.parent.displayWidth;
    this.displayHeight = this.parent.displayHeight / 4;
    this.firstCell = {
      y: this.parent.y - ((this.parent.displayHeight/2) - (this.displayHeight/2))
    };

    this.x = this.scene.cameras.main.centerX;
    this.y = this.firstCell.y + ((this.displayHeight) * this.pos);

    this.setScale(this.scaleX * 0.95, this.scaleY * 0.9);
    this.originScaleX = this.scaleX;
    this.originScaleY = this.scaleY;

    this.scaleText = () => {
      if (this.text.displayWidth >= this.displayWidth - (this.displayWidth * 0.1)) {
        this.text.displayWidth = this.displayWidth - (this.displayWidth * 0.1);
        this.text.scaleY = this.text.scaleX;
      } else {
        this.text.scale = this.scale;
      }
    };
    
    this.killme = () => {
      this.destroy();
      this.text.destroy();
    };
    
    this.text = this.scene.make.text({
      add: true,
      x: this.x,
      y: this.y,
      origin: 0.5,
      alpha: 0,
      text: props.text,
      style: {
        fontSize: '48px',
        fontFamily: 'Arial',
        color: '#000000',
        align: 'center'
      }
    });

    this.scaleText();

    this.tweenIn = () => this.scene.tweens.add({
      paused: true,
      targets: [this, this.text],
      y: {
        from: () => props.scene.game.canvas.height + this.displayHeight,
        to: this.y
      },
      ease: 'Cubic.InOut',
      duration: 1000
    });

    this.flip = () => this.scene.tweens.add({
      paused: true,
      targets: this,
      scaleY: {
        from: this.scaleY,
        to: 0
      },
      scaleX: {
        from: this.scaleX,
        to: this.scaleX + 0.1
      },
      onComplete: () => {
        if (this.flipped) {
          this.setTexture('card');
          this.flipped = false;
        } else {
          this.setTexture('card_bgr');
          this.flipped = true;
        }
        
        this.flipBack().play();
      },
      ease: 'Linear.None',
      duration: 50
    });

    this.flipBack = () => this.scene.tweens.add({
      paused: true,
      targets: this,
      scaleY: {
        from: this.scaleY,
        to: this.originScaleY
      },
      scaleX: {
        from: this.scaleX,
        to: this.originScaleX
      },
      ease: 'Linear.None',
      duration: 50,
      onComplete: () => {
        if (this.text.alpha == 0) this.text.alpha = 1;
        else this.text.alpha = 0;
      }
    });

    this.on('pointerdown', () => {
      let state = props.scene.getState();
      
      if (state == "idle") {
        this.flip().play();
        props.scene.setLastClicked(this);
        props.scene.setAnswer(this.text.text);
        props.scene.flipImageCards(true);
      } else if (state == "guessing_word") {
        if (props.scene.getAnswer() === this.text.text) {
          let lastClicked = props.scene.getLastClicked();
          lastClicked.killme();
          this.killme();
          props.scene.checkCardsAnswers();
        }

        props.scene.flipWordCards(false);
        props.scene.flipImageCards(false);
      }
    });

    return this;
  }
}