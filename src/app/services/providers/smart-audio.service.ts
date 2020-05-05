import { Injectable } from '@angular/core';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { Platform } from '@ionic/angular';
import {Howl, Howler} from 'howler';

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
        audio: new Howl({
          src: [asset],
          onplayerror: function() {
            this.once('unlock', function() {
              this.play();
            });
          }
        }),
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

  play(key, noReset?: boolean, cloneNode?: boolean, rate?: number){
    let audio = this.sounds.find((sound) => {
      return sound.key === key;
    });

    if(audio.type === 'html5'){
      if (!noReset) {
        audio.audio.stop();
      }
      
      if (cloneNode) {
        let sound = new Howl({
          src: [audio.asset],
          rate: rate
        });
        sound.play();

        sound.on('end', function(){
          sound.unload();
        });
      } else {
        audio.audio.play();
      }
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
