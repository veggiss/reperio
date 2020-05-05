import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {
  tween,
  DIFFICULTY,
  loadImages,
  getFinnOrdetData,
  getTimeBonus,
  getOrddelingData, getStatPoint, getTimeStat, addRoundStats, toggleSoundMuted, getSoundMuted, printFunction
} from "../../../services/globals";
import { CountUp } from 'countup.js';
import {ActivatedRoute, NavigationExtras, Router} from "@angular/router";
import {SmartAudioService} from "../../../services/providers/smart-audio.service";
import {LoadingService} from "../../../services/loader/loading.service"

@Component({
  selector: 'app-finn-ordet',
  templateUrl: './finn-ordet.page.html',
  styleUrls: ['./finn-ordet.page.scss']
})

export class FinnOrdetPage implements OnInit {  
  public questionImageElement: HTMLElement;  
  public container: HTMLElement;
  public allowInput: boolean = false;
  public pointsElement: HTMLElement;
  public countUp: any;
  public timeLeft: number;
  public timeStamp: number;
  public timerInterval: any;
  public points: number;
  public correctAnswers;
  public round: number;
  public roundData: any;
  public precachedRoundData: any;

  public getSoundMuted: any = getSoundMuted;
  public toggleSoundMuted: any = toggleSoundMuted;
  public maxRounds: number = 7;
  public questionImageSrc: string = "";
  public alternativeBtns: any = [];
  public maxTimeTaken: number = 30;
  public category: string = 'lese';
  public statsPoints: any = {};
  public roundTextAlternatives = ["", "", "", ""];
  public gameHistory: any = {};

  constructor(private router: Router, private smartAudio: SmartAudioService, private loader: LoadingService) {}

  async ngOnInit() {
    this.smartAudio.preload('correct_answer', '../../../../assets/audio/fx/correct_answer.mp3');
    this.smartAudio.preload('countup_tick', '../../../../assets/audio/fx/countup_tick.mp3');
    this.smartAudio.preload('wrong_answer', '../../../../assets/audio/fx/wrong_answer.mp3');
    this.smartAudio.preload('clock_tick', '../../../../assets/audio/fx/clock_tick.mp3');
    this.smartAudio.preload('swosh_out', '../../../../assets/audio/fx/swosh_out.mp3');
    this.smartAudio.preload('swosh_in', '../../../../assets/audio/fx/swosh_in.mp3');
    
    this.container = document.getElementById("main-container");
    this.pointsElement = document.getElementById("finn-ordet-points");
    this.questionImageElement = document.getElementById("question-image");
    [1, 2, 3, 4].forEach((i) => {
      let alternativeBtn = document.getElementById('alternative' + i);
      this.alternativeBtns.push(alternativeBtn);
    });

    this.countUp = new CountUp('finn-ordet-points', 0);
  }

  async ionViewWillEnter() {
    this.container.style.visibility = "hidden";
    this.points = 0;
    this.correctAnswers = 0;
    this.round = 0;    
    this.roundData = getFinnOrdetData(DIFFICULTY[1], this.maxRounds);
    this.precachedRoundData = JSON.parse(JSON.stringify(this.roundData));
    this.countUp.reset();
    this.gameHistory = {};
    
    this.loader.loadingPresent();    
    await loadImages(this.roundData);
    this.loader.loadingDismiss();

    this.startRound();
  }

  ionViewWillLeave() {
    clearInterval(this.timerInterval);
  }
  
  addPoints(points, timeBonus) {
    this.points += Math.round((points * DIFFICULTY[1]) + timeBonus);
    this.countUp.update(this.points);
    
    tween(this.pointsElement, "tada", "slow", null, null);
  }
  
  startRound() {
    this.container.style.visibility = "visible";
    this.questionImageSrc = this.roundData[this.round].image.src;
    this.timeLeft = this.maxTimeTaken;
    this.playAudio('swosh_in');
    
    this.startTimer();
    
    this.alternativeBtns.forEach((btn, i) => {
      this.roundTextAlternatives[i] = this.roundData[this.round].alternatives[i];
      btn.color = "light";
    });

    tween(this.container, "slideInRight", "fast", null, () => {
      this.timeStamp = Date.now();
      this.allowInput = true
    });    
  }
  
  endRound() {
    this.playAudio('swosh_out');
    tween(this.container, "slideOutLeft", "fast", "out", () => {
      this.container.style.visibility = "hidden";
      this.round++;
      
      if (this.round >= this.roundData.length) {
        let data: NavigationExtras = {
          state: {
            id: 1,
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
  
  answer(evt) {    
    if (this.allowInput) {
      clearInterval(this.timerInterval);
      
      this.allowInput = false;
      let target = evt.target;
      let answer = target.innerHTML;
      let answeredCorrect = answer.toUpperCase() == this.roundData[this.round].answer.toUpperCase();
      
      if (answeredCorrect) {
        this.playAudio('correct_answer');
        this.correctAnswers++;
        target.color = 'success';
        this.addPoints(10, getTimeBonus(this.timeStamp, this.maxTimeTaken));
        addRoundStats(this.statsPoints, 'hurtighet', this.timeLeft, null);
      } else {
        this.playAudio('wrong_answer');
        target.color = "danger";
      }
      
      this.addRoundInfo(answeredCorrect, answer);

      tween(target, "pulse", "slow", null, () => {
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
