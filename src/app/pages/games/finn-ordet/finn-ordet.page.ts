import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {
  tween,
  DIFFICULTY,
  loadImages,
  getFinnOrdetData,
  getTimeBonus,
  getOrddelingData, getStatPoint, getTimeStat, addRoundStats
} from "../../../services/globals";
import { CountUp } from 'countup.js';
import {ActivatedRoute, NavigationExtras, Router} from "@angular/router";

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

  public maxRounds: number = 10;
  public questionImageSrc: string = "";
  public alternativeBtns: any = [];
  public maxTimeTaken: number = 30;
  public category: string = 'lese';
  public statsPoints: any = {};
  public roundTextAlternatives = ["", "", "", ""];
  public gameHistory: any = {};

  constructor(private router: Router) {}

  async ngOnInit() {
    //let orientation = window.screen.orientation;
    //await orientation.lock("portrait");

    //TODO: Change these to using local id #variable
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
    
    await loadImages(this.roundData);
    
    this.startRound();
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
  
  answer(evt) {    
    if (this.allowInput) {
      clearInterval(this.timerInterval);
      
      this.allowInput = false;
      let target = evt.target;
      let answer = target.innerHTML;
      let answeredCorrect = answer.toUpperCase() == this.roundData[this.round].answer.toUpperCase();
      
      if (answeredCorrect) {
        this.correctAnswers++;
        target.color = 'success';
        this.addPoints(10, getTimeBonus(this.timeStamp, this.maxTimeTaken));
        addRoundStats(this.statsPoints, 'hurtighet', this.timeLeft, null);
      } else {
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
      if (this.timeLeft > 0) this.timeLeft--;
    }, 1000);
  }
}
