import { Injectable } from '@angular/core';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class SmartAudioService {
  audioType: string = 'html5';
  sounds: any = [];

  constructor(public nativeAudio: NativeAudio, platform: Platform) {
    if(platform.is('cordova')){
      this.audioType = 'native';
    }
  }

  preload(key, asset) {
    if(this.audioType === 'html5'){
      let audio = {
        audio: new Audio(asset),
        key: key,
        asset: asset,
        type: 'html5'
      };

      this.sounds.push(audio);
    } else {
      this.nativeAudio.preloadSimple(key, asset);

      let audio = {
        key: key,
        asset: key,
        type: 'native'
      };

      this.sounds.push(audio);
    }
  }

  play(key){
    let audio = this.sounds.find((sound) => {
      return sound.key === key;
    });

    if(audio.type === 'html5'){
      audio.audio.pause();
      audio.audio.currentTime = 0;
      audio.audio.play();
    } else {
      this.nativeAudio.play(audio.asset).then((res) => {
        console.log(res);
      }, (err) => {
        console.log(err);
      });
    }
  }

  stop(key){
    let audio = this.sounds.find((sound) => {
      return sound.key === key;
    });

    if(audio.type === 'html5'){
      audio.audio.pause();
      audio.audio.currentTime = 0;
    } else {
      this.nativeAudio.stop(audio.asset).then((res) => {
        console.log(res);
      }, (err) => {
        console.log(err);
      });
    }
  }
}
