import * as Phaser from 'phaser';

import { MainScene } from './main.scene';

export class BootScene extends Phaser.Scene {	
	create() {		
		this.scene.add('main', MainScene, true);
	}

	pause() {
		this.scene.pause();
	}
}