import * as Phaser from "phaser";

export default class Polaroid extends Phaser.GameObjects.Sprite {
    constructor(props) {
        super(props.scene, 0, 0, 'polaroid');
        
        

        props.scene.add.existing(this);

        return this;
    }
}