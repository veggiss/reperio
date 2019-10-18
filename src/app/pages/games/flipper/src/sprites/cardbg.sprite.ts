import * as Phaser from "phaser";

export default class Cardbg extends Phaser.GameObjects.Sprite {

    constructor(props) {
        super(props.scene, 0, 0, 'card_bgr');
        
        this.displayHeight = this.scene.game.canvas.height * 0.4;
        this.displayWidth = this.displayHeight;
        this.setOrigin(0.5, 0.5);

        this.x = this.scene.cameras.main.centerX;
        
        if (props.upper) {
            this.y = this.scene.cameras.main.centerY - (this.displayHeight/1.5);
        } else {
            this.y = this.scene.cameras.main.centerY + (this.displayHeight/1.5);
        }

        props.scene.add.existing(this);
    }
}