import * as Phaser from "phaser";

export default class Image extends Phaser.GameObjects.Sprite {
    private getPolaroid: any;
    private getButtons: any;
    private tweenIn: any;
    private getRound: any;
    
    constructor(props) {
        super(props.scene, props.x, props.y, null);
        this.setActive(false);
        
        this.getPolaroid = props.scene.getPolaroid;
        this.getButtons = props.scene.getButtons;
        this.getRound = props.scene.getRound;
        
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
            onStart: () => {
                this.setTexture('image_' + this.getRound());
                this.displayHeight = this.scene.game.canvas.height * 0.4;
                this.scaleX = this.scaleY;
            },
            onUpdate: () => {
                this.angle = this.getPolaroid().angle;
                this.x = this.getPolaroid().x;
                this.y = this.getPolaroid().y;
            }
        });

        props.scene.add.existing(this);
    }
}