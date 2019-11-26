import * as Phaser from 'phaser';
import Book from "./sprites/book.sprite";


export class MainScene extends Phaser.Scene {
  private bgSprite: Phaser.GameObjects.TileSprite;
  private book: Book;
  
  private dummyData: any = {
      id: 1,
      sentence: "Jenta _ bukk _ _",
      correct: ["hopper", "over", "lia"],
      wrong: ["under", "sitter", "fniser"]
  };
  
  preload() {
      
    this.load.image('bg_tile', 'assets/img/games/album/bg_tile.png');
    this.load.image('book_open', 'assets/img/games/album/book_open.png');
    this.load.image('polaroid', 'assets/img/games/match/polaroid.png');
    this.load.image('test_image', 'assets/img/games/images/vost/image-1.jpg');
    this.load.image('alternative', 'assets/img/alternative.png');
  }

  init () {
      //this.game.scale.forceOrientation(false, true);
      this.scale.lockOrientation("landscape");
      this.scale.updateOrientation();
  }

  create () {
      this.bgSprite = this.add.tileSprite(0, 0, this.game.canvas.width * window.devicePixelRatio, this.game.canvas.height * window.devicePixelRatio, 'bg_tile');
      this.book = new Book({scene: this, data: this.dummyData});
  }

  update () {
  }
}