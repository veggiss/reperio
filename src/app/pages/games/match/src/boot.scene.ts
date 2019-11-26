import * as Phaser from 'phaser';
import { MainScene } from './main.scene';
import { HighscoreScene } from '../../highscore.scene';

export class BootScene extends Phaser.Scene {
	create() {
		this.scene.add('highscore', HighscoreScene, false);
		this.scene.add('main', MainScene, true);
	}

	pause() {
		this.scene.pause();
	}
}