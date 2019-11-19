import * as Phaser from "phaser";

export default class Book extends Phaser.GameObjects.Sprite {
  public image: any;
  private text: Phaser.GameObjects.Text;
  constructor(props) {
    super(props.scene, 0, 0, 'book_open');
    
    this.x = this.scene.cameras.main.centerX;
    this.y = this.scene.cameras.main.centerY;
    this.setOrigin(0.5, 0.5);    
    
    let gameWidth = props.scene.game.canvas.width;
    let gameHeight = props.scene.game.canvas.height;
    
    this.displayWidth = gameWidth * 0.9;
    this.scaleY = this.scaleX;
    
    if (this.displayHeight > gameHeight * 0.9) {
      this.displayHeight = gameHeight * 0.9;
      this.scaleX = this.scaleY;
    }

    props.scene.add.existing(this);

    this.image = props.scene.add.sprite(0, 0,'test_image');
    this.image.displayWidth = this.displayWidth * 0.3;
    this.image.scaleY = this.image.scaleX;
    this.image.x = this.x - (this.displayWidth * 0.25);
    this.image.y = this.y - (this.displayHeight * 0.18);

    this.text = this.scene.make.text({
      
      add: true,
      x: this.image.x,
      y: this.image.y + (this.image.displayWidth * 0.65),
      width : 100,
      height: 50,
      origin: 0.5,
      scale: 1,
      text: 'how nmuch text caiosdao sdjaois djoaisd jaiosdj aoisjd aosidj',
      style: {
        fontSize: '48px',
        fontFamily: 'Arial',
        color: '#000000',
        align: 'center',
        backgroundColor: '#24252A'
      }
    });


    return this;
  }
}