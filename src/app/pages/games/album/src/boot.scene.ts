import * as Phaser from 'phaser';

import { MainScene } from './main.scene';

export class BootScene extends Phaser.Scene {	
	create() {
		//this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
		//this.scale.lockOrientation('landscape');
		//this.scale.updateOrientation();
		
		this.scene.add('main', MainScene, true);
	}

	pause() {
		this.scene.pause();
	}
}