import * as Phaser from "phaser";

export default class ImageCardBg extends Phaser.GameObjects.Sprite {

    constructor(props) {
        super(props.scene, 0, 0, 'card_bgr');
        this.alpha = 0;
        this.displayHeight = this.scene.game.canvas.height * 0.5;
        this.displayWidth = this.displayHeight;
        this.setOrigin(0.5, 0.5);

        this.x = this.scene.cameras.main.centerX;
        this.y = (this.displayHeight/2) + (this.displayHeight * 0.1);

        props.scene.add.existing(this);
        
        return this;
    }
}