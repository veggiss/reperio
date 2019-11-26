import * as Phaser from "phaser";

export default class Btn extends Phaser.GameObjects.Sprite {
    public isAnswer: any;
    
    private text: any;
    private tweenIn: any;
    private tweenOut: any;
    private tweenCorrect: any;
    private index: any;
    private roundData: any;
    private round: any;
    private getButtons: any;
    private getMainState: any;
    private setMainState: any;
    private getBtnText: any;
    private delay: number;
    private scaleText: any;
    
    constructor(props) {
        super(props.scene, props.x, props.y, 'alternative');
        props.scene.add.existing(this);

        this.getButtons = props.scene.getButtons;
        this.roundData = props.scene.roundData;
        this.getMainState = props.scene.getMainState;
        this.getBtnText = props.scene.getBtnText;
        this.round = props.scene.round;
        this.index = props.index;
        this.setMainState = props.scene.setMainState;
        this.isAnswer = () => props.scene.btnIsAnswer(this.index);
            
        this.scaleText = () => {
            if (this.text.displayWidth >= this.displayWidth) {
                this.text.displayWidth = this.displayWidth - (this.displayWidth * 0.1);
                this.text.scaleY = this.text.scaleX;
            } else {
                this.text.scale = this.scale;
            }
        };

        this.setVisible(false);
        this.setScale(0);
        this.setInteractive();
        this.setOrigin(0.5);
        this.text = this.scene.make.text({
            add: true,
            x: this.x,
            y: this.y,
            origin: 0.5,
            scale: 0,
            text: '',
            style: {
                fontSize: '48px',
                fontFamily: 'Source Sans Pro',
                color: '#000000',
                align: 'center'
            }
        });

        this.tweenIn = () => this.scene.tweens.add({
            paused: true,
            targets: this,
            displayWidth: {
                from: 0,
                to: Math.round(this.scene.game.canvas.width * 0.45)
            },
            displayHeight: {
                from: 0,
                to: Math.round(this.scene.game.canvas.height * 0.1)
            },
            ease: 'Back.Out',
            delay: 100,
            duration: 500,
            onStart: () => {
                this.setVisible(true);
                this.clearTint();
                this.scale = 0;
                this.alpha = 1;
                this.text.scale = 0;
                this.text.alpha = 1;
                this.text.text = this.getBtnText(this.index);
            },
            onUpdate: () => this.scaleText()
        });
        
        this.tweenOut = delay => this.scene.tweens.add({
            targets: [this, this.text],
            paused: true,
            alpha: {
                from: 1,
                to: 0
            },
            ease: 'Cubic.Out',
            delay: delay,
            duration: 500,
            onComplete: () => this.emit('complete')
        });

        this.tweenCorrect = () => this.scene.tweens.add({
            targets: this,
            paused: true,
            scaleX: {
                from: this.scaleX,
                to: this.scaleX * 1.1
            },
            scaleY: {
                from: this.scaleY,
                to: this.scaleY * 1.1
            },
            ease: 'Cubic.Out',
            delay: this.delay,
            duration: 200,
            yoyo: true,
            onUpdate: () => this.scaleText()
        });
        
        this.on('pointerdown', () => {
            if (this.getMainState() == 'guessing') {
                this.setMainState(1);
                this.emit('answer', this.isAnswer(), this);
            }
        });
    }
}