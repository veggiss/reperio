import { Component, OnInit } from '@angular/core';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import {
  addRoundStats,
  DIFFICULTY,
  getOrddelingData,
  getSantUsantData, getStatPoint,
  getTimeBonus, getTimeStat,
  loadImages,
  tween
} from "../../../services/globals";
import {NavigationExtras, Router} from "@angular/router";
import {CountUp} from "countup.js";
import {SmartAudioService} from "../../../services/providers/smart-audio.service";

@Component({
  selector: 'app-sant-usant',
  templateUrl: './sant-usant.page.html',
  styleUrls: ['./sant-usant.page.scss'],
})
export class SantUsantPage implements OnInit {
  public container: HTMLElement;
  public pointsElement: HTMLElement;
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

  public statsPoints: any = {};
  public maxTimeTaken: number = 30;
  public gameHistory: any = {};
  public maxRounds: number = 10;
  
  constructor(private router: Router, private smartAudio: SmartAudioService) { }

  async ngOnInit() {   
    this.container = document.getElementById("main-container");
    this.pointsElement = document.getElementById('sant-usant-points');
    this.countUp = new CountUp('sant-usant-points', 0);
  }

  async ionViewWillEnter() {
    this.container.style.visibility = "hidden";
    this.countUp.reset();
    this.round = 0;
    this.points = 0;
    this.correctAnswers = 0;
    this.roundData = getSantUsantData(DIFFICULTY[3], this.maxRounds);
    this.precachedRoundData = JSON.parse(JSON.stringify(this.roundData));
    
    await loadImages(this.roundData);

    this.startRound();
  }
  
  startRound() {
    
    this.container.style.visibility = "visible";
    this.questionImageSrc = this.roundData[this.round].image.src;
    this.questionText = this.roundData[this.round].question;
    this.timeLeft = this.maxTimeTaken;
    this.clearSelection();
    this.startTimer();
    
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
    tween(this.container, "slideOutLeft", "fast", "out", () => {
      this.container.style.visibility = "hidden";
      this.round++;

      if (this.round >= this.roundData.length) {
        let data: NavigationExtras = {
          state: {
            id: 3,
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
        clickedElement.setAttribute('color', 'success');
        let timeBonus = getTimeBonus(this.timeStamp, this.maxTimeTaken);
        this.addPoints(30, timeBonus);
        this.correctAnswers++;
        addRoundStats(this.statsPoints, 'hurtighet', this.timeLeft, null);
      } else {
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
      if (this.timeLeft > 0) this.timeLeft--;
    }, 1000);
  }
}
