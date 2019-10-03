import * as Phaser from "phaser";

export default class Btn extends Phaser.GameObjects.Sprite {
    private delay: number = 0;
    public text: any;
    private tweenIn: any;
    private tweenOut: any;
    
    constructor(props) {
        super(props.scene, props.x, props.y, 'alternative');
        
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
                fontFamily: 'Arial',
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
                console.log("lolololasdasd");
                this.alpha = 1;
                this.text.alpha = 1;
                //text.text = this.scene.roundData[this.round].alternatives[i];
            },
            onUpdate: () => {
                if (this.text.displayWidth >= this.displayWidth) {
                    this.text.displayWidth = this.displayWidth - (this.displayWidth * 0.1);
                    this.text.scaleY = this.text.scaleX;
                } else {
                    this.text.scale = this.scale;
                }
            }
            //onComplete: () => {
            //    this.state = 2;
            //}
        });
        
        this.tweenOut = () => this.scene.tweens.add({
            targets: [this, this.text],
            paused: true,
            alpha: {
                start: 1,
                from: 1,
                to: 0
            },
            ease: 'Cubic.Out',
            delay: 2500,
            duration: 500,
            //onComplete: () => {
            //    if (this.isCorrect) this.polaroid.tween.out.restart();
            //}
        });
    }
}