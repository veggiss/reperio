import * as Phaser from "phaser";

export default class Image extends Phaser.GameObjects.Sprite {
    private tweenIn: any;
    
    constructor(props) {
        super(props.scene, props.x, props.y, null);
        
        this.displayHeight = this.scene.game.canvas.height * 0.4;
        this.scaleX = this.scaleY;
        this.setOrigin(0.5);
        this.alpha = 0;

        this.tweenIn = () => this.scene.tweens.add({
            paused: true,
            targets: this,
            alpha: {
                from: 0,
                to: 1
            },
            ease: 'Cubic.InOut',
            duration: 500,
            //onUpdate: () => {
            //    image.angle = this.polaroid.angle;
            //    image.x = this.polaroid.x;
            //    image.y = this.polaroid.y;
            //},
            //onComplete: () => this.alternatives.forEach(btn => btn.tween.in.play())
        });
    }
}