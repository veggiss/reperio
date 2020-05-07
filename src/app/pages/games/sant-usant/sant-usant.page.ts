import {Component, OnInit, ViewChild} from '@angular/core';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import {
  addRoundStats,
  DIFFICULTY,
  getOrddelingData,
  getSantUsantData, getStatPoint,
  getTimeBonus, getTimeStat,
  loadImages,
  tween,
  getSoundMuted,
  toggleSoundMuted, PLAYER_STATS
} from "../../../services/globals";
import {NavigationExtras, Router} from "@angular/router";
import {CountUp} from "countup.js";
import {SmartAudioService} from "../../../services/providers/smart-audio.service";
import {LoadingService} from "../../../services/loader/loading.service";

@Component({
  selector: 'app-sant-usant',
  templateUrl: './sant-usant.page.html',
  styleUrls: ['./sant-usant.page.scss'],
})
export class SantUsantPage implements OnInit {
  @ViewChild('container', null) container;
  @ViewChild('pointsElement', null) pointsElement;
  
  public questionImageSrc: any;
  public questionText: string;
  public timeStamp: number;
  public allowInput: boolean;
  public roundData: any;
  public round: number;
  public points: number;
  public correctAnswers: number;
  public precachedRoundData: any;
  public countUp: any;
  public timeLeft: number;
  public timerInterval: any;

  public getSoundMuted: any = getSoundMuted;
  public toggleSoundMuted: any = toggleSoundMuted;
  public statsPoints: any = {};
  public maxTimeTaken: number = 30;
  public gameHistory: any = {};
  public maxRounds: number = 7;
  
  constructor(private router: Router, private smartAudio: SmartAudioService, private loader: LoadingService) {}

  async ngOnInit() {
    if (PLAYER_STATS.level < 2) {
      this.router.navigate([`/`]);
      return;
    }
    
    this.smartAudio.preload('correct_answer', '../../../../assets/audio/fx/correct_answer.mp3');
    this.smartAudio.preload('countup_tick', '../../../../assets/audio/fx/countup_tick.mp3');
    this.smartAudio.preload('wrong_answer', '../../../../assets/audio/fx/wrong_answer.mp3');
    this.smartAudio.preload('clock_tick', '../../../../assets/audio/fx/clock_tick.mp3');
    this.smartAudio.preload('swosh_out', '../../../../assets/audio/fx/swosh_out.mp3');
    this.smartAudio.preload('swosh_in', '../../../../assets/audio/fx/swosh_in.mp3');

    this.container = this.container.nativeElement;
    this.pointsElement = this.pointsElement.el;
    this.countUp = new CountUp('sant-usant-points', 0);
  }

  async ionViewWillEnter() {
    if (PLAYER_STATS.level < 2) return;
    
    this.container.style.visibility = "hidden";
    this.countUp.reset();
    this.round = 0;
    this.points = 0;
    this.gameHistory = {};
    this.correctAnswers = 0;
    this.roundData = getSantUsantData(DIFFICULTY[2], this.maxRounds);
    this.precachedRoundData = JSON.parse(JSON.stringify(this.roundData));

    this.loader.loadingPresent();
    await loadImages(this.roundData);
    this.loader.loadingDismiss();

    this.startRound();
  }

  ionViewWillLeave() {
    clearInterval(this.timerInterval);
  }
  
  startRound() {
    this.container.style.visibility = "visible";
    this.questionImageSrc = this.roundData[this.round].image.src;
    this.questionText = this.roundData[this.round].question;
    this.timeLeft = this.maxTimeTaken;
    this.clearSelection();
    this.startTimer();

    this.playAudio('swosh_in');
    
    tween(this.container, "slideInRight", "fast", null, () => {
      this.timeStamp = Date.now();
      this.allowInput = true;
    });
  }

  addPoints(points, timeBonus) {
    this.points += Math.round((points * DIFFICULTY[2]) + timeBonus);
    this.countUp.update(this.points);
    tween(this.pointsElement, "tada", "slow", null, null);
  }

  endRound() {
    this.playAudio('swosh_out');
    tween(this.container, "slideOutLeft", "fast", "out", () => {
      this.container.style.visibility = "hidden";
      this.round++;

      if (this.round >= this.roundData.length) {
        let data: NavigationExtras = {
          state: {
            id: 2,
            points: this.points,
            correctAnswers: this.correctAnswers,
            rounds: this.roundData.length,
            category: 'lese',
            gameHistory: this.gameHistory,
            roundData: this.precachedRoundData,
            statPoints: this.statsPoints
          }
        };

        this.router.navigate([`/score-page`], data);
      } else {
        this.startRound();
      }
    });
  }

  playAudio(key) {
    if (!getSoundMuted()) this.smartAudio.play(key);
  }

  clearSelection() {
    document.querySelectorAll('.alternative-btn').forEach(e => e.setAttribute('color', "light"));
  }
  
  answer(event, guess) {
    if (this.allowInput) {
      this.allowInput = false;
      clearInterval(this.timerInterval);
      
      let answeredCorrect = this.roundData[this.round].answer == guess;
      let clickedElement = event.target;
      
      if (answeredCorrect) {
        this.playAudio('correct_answer');
        clickedElement.setAttribute('color', 'success');
        let timeBonus = getTimeBonus(this.timeStamp, this.maxTimeTaken);
        this.addPoints(30, timeBonus);
        this.correctAnswers++;
        addRoundStats(this.statsPoints, 'hurtighet', this.timeLeft, null);
      } else {
        this.playAudio('wrong_answer');
        clickedElement.setAttribute('color', 'danger');
      }

      this.addRoundInfo(answeredCorrect, guess);

      tween(clickedElement, "pulse", "slow", null, () => {
        setTimeout(() => {
          this.endRound();
        }, 500);
      });
    }
  }

  addRoundInfo(answeredCorrect, answer) {
    if (this.roundData[this.round].stats) {
      let roundDifficulty = this.roundData[this.round].difficulty;
      this.roundData[this.round].stats.forEach(stat => addRoundStats(this.statsPoints, stat, roundDifficulty, answeredCorrect));

      if (!this.gameHistory[this.round]) this.gameHistory[this.round] = [];

      this.gameHistory[this.round].push({
        guessedWord: answer,
        answeredCorrect: answeredCorrect,
        timeTaken: (Date.now() - this.timeStamp) / 1000
      });
    } else {
      console.log('No stats list found for round: ' + this.round);
    }
  }

  startTimer() {
    this.timerInterval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.playAudio('clock_tick');
        this.timeLeft--;
      }
    }, 1000);
  }
}
