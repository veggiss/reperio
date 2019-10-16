import * as Phaser from "phaser";

export default class Polaroid extends Phaser.GameObjects.Sprite {
    private tweenIn: any;
    private tweenOut: any;
    private round: any;
    private getImage: any;
    
    constructor(props) {
        super(props.scene, props.x, props.y, 'polaroid');
        
        this.round = props.scene.round;
        this.getImage = props.scene.getImage;
        
        this.x = this.scene.cameras.main.centerX;
        this.y = Math.round((this.displayHeight/2) + (this.scene.game.canvas.height * 0.05));
        this.displayHeight = this.scene.game.canvas.height * 0.5;
        this.scaleX = this.scaleY;
        this.setOrigin(0.495, 0.449);
        
        this.tweenIn = () => this.scene.tweens.add({
            paused: true,
            targets: this,
            x: {
                from: () => Phaser.Math.Between(0, this.scene.game.canvas.width),
                to: this.scene.cameras.main.centerX
            },
            y: {
                from: this.scene.game.canvas.height + this.displayHeight,
                to: Math.round((this.displayHeight/2) + (this.scene.game.canvas.height * 0.05))
            },
            angle: {
                from: () => Phaser.Math.Between(100, 250),
                to: () => Phaser.Math.Between(0, 10)
            },
            ease: 'Cubic.InOut',
            duration: 1000
        });
        
        this.tweenOut = () => this.scene.tweens.add({
            paused: true,
            targets: this,
            x: {
                start: this.scene.cameras.main.centerX,
                from: this.scene.cameras.main.centerX,
                to: -this.scene.game.canvas.width
            },
            ease: 'Cubic.InOut',
            duration: 500,
            onUpdate: () => {
                this.getImage().x = this.x;
                this.getImage().y = this.y;
            }
        });

        props.scene.add.existing(this);
    }
}