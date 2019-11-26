import * as Phaser from "phaser";

export default class ImageCard extends Phaser.GameObjects.Sprite {
    private parent: any;
    private firstCell: { x: number; y: number };
    public posX: any;
    public posY: any;
    public image: Phaser.GameObjects.Sprite;
    public answer: string;
    public killme: () => void;
    public tweenIn: () => Phaser.Tweens.Tween;
    public outOfBounds: any;
    private flip: any;
    private originScaleX: number;
    private originScaleY: number;
    public flipped: boolean;
    private flipBack: any;

    constructor(props) {
        super(props.scene, 0, 0, 'card');
        
        props.scene.add.existing(this);
        
        this.setOrigin(0.5, 0.5);
        this.setInteractive();
        this.flipped = false;
        this.posX = props.posX;
        this.posY = props.posY;
        this.parent = props.parent;
        this.answer = props.answer;
        this.displayWidth = this.parent.displayWidth / 2;
        this.displayHeight = this.parent.displayHeight / 2;
        this.firstCell = {
            x: this.parent.x - ((this.parent.displayWidth/2) + (this.displayWidth/2)), 
            y: this.parent.y - ((this.parent.displayHeight/2) + (this.displayHeight/2))
        };
        
        this.x = this.firstCell.x + ((this.displayWidth) * this.posX);
        this.y = this.firstCell.y + ((this.displayHeight) * this.posY);
        this.outOfBounds = props.scene.game.canvas.width + this.displayWidth;
        
        this.setScale(this.scaleX * 0.9, this.scaleY * 0.9);
        this.originScaleX = this.scaleX;
        this.originScaleY = this.scaleY;

        this.image = props.scene.add.sprite(this.x, this.y, props.image);
        this.image.setOrigin(0.5, 0.5);
        this.image.displayWidth = this.displayWidth;
        this.image.displayHeight = this.displayHeight;
        this.image.alpha = 0;

        this.killme = () => {
            this.destroy();
            this.image.destroy();
        };

        this.tweenIn = () => this.scene.tweens.add({
            paused: true,
            targets: [this, this.image],
            y: {
                from: () => -this.displayHeight,
                to: this.y
            },
            ease: 'Cubic.InOut',
            duration: 1000
        });

        this.flip = () => this.scene.tweens.add({
            paused: true,
            targets: this,
            scaleX: {
                from: this.scaleX,
                to: 0
            },
            scaleY: {
                from: this.scaleY,
                to: this.scaleY + 0.2
            },
            onComplete: () => {
                if (this.flipped) {
                    this.image.alpha = 0;
                    this.flipped = false;
                } else {
                    this.image.alpha = 1;
                    this.flipped = true;
                }
                
                this.flipBack().play();
            },
            onUpdate: () => {
                this.image.displayWidth = this.displayWidth;
                this.image.displayHeight = this.displayHeight;
            },
            ease: 'Linear.None',
            duration: 50
        });

        this.flipBack = () => this.scene.tweens.add({
            paused: true,
            targets: this,
            scaleX: {
                from: this.scaleX,
                to: this.originScaleX
            },
            scaleY: {
                from: this.scaleY,
                to: this.originScaleY
            },
            onUpdate: () => {
                this.image.displayWidth = this.displayWidth;
                this.image.displayHeight = this.displayHeight;
            },
            ease: 'Linear.None',
            duration: 50
        });

        this.on('pointerdown', () => {
            let state = props.scene.getState();
            
            if (state == "idle") {
                this.flip().play();
                props.scene.setLastClicked(this);
                props.scene.setAnswer(this.answer);
                props.scene.flipWordCards(true);
            } else if (state == "guessing_image") {
                if (props.scene.getAnswer() === this.answer) {
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