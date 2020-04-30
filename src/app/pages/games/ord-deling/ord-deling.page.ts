import { Component, OnInit } from '@angular/core';
import {
  addRoundStats,
  DIFFICULTY,
  getOrddelingData,
  getStatPoint,
  getTimeBonus, getTimeStat,
  loadImages,
  shuffle,
  tween
} from "../../../services/globals";
import {NavigationExtras, Router} from "@angular/router";
import {CountUp} from "countup.js";

@Component({
  selector: 'app-ord-deling',
  templateUrl: './ord-deling.page.html',
  styleUrls: ['./ord-deling.page.scss'],
})
export class OrdDelingPage implements OnInit {
  public container: HTMLElement;
  public sideLocked: string;
  public lastClickedElement: HTMLElement;
  public pointsElement: HTMLElement;
  public countUp: any;
  public timeStamp: number;
  public round: number;
  public points: number;
  public roundData: any;
  public precachedRoundData: any;
  public allowInput: boolean;
  public questionImageSrc: any;
  public answeredCorrect: boolean;
  public maxRounds: number;
  public correctAnswers: number;
  public timeLeft: number;
  public timerInterval: any;
  public alternatives: any;

  public maxTimeTaken: number = 30;
  public gameHistory: any = {};
  public statsPoints: any = {};
  public pairsRemoved: number = 0;

  constructor(private router: Router) { }

  async ngOnInit() {
    this.container = document.getElementById("main-container");
    this.pointsElement = document.getElementById('ord-deling-points');
    this.countUp = new CountUp('ord-deling-points', 0);
  }

  async ionViewWillEnter() {
    this.container.style.visibility = "hidden";
    this.countUp.reset();
    this.roundData = getOrddelingData(DIFFICULTY[2], 6);
    this.precachedRoundData = JSON.parse(JSON.stringify(this.roundData));
    this.allowInput = false;
    this.correctAnswers = 0;
    this.round = 0;
    this.points = 0;

    this.startRound();
  }

  clearSelection() {
    document.querySelectorAll('.alternative-btn').forEach(e => e.setAttribute('color', "light"));
  }

  startRound() {
    this.container.style.visibility = "visible";
    this.timeLeft = this.maxTimeTaken;
    this.lastClickedElement = null;
    this.answeredCorrect = true;
    this.pairsRemoved = 0;
    this.clearSelection();
    this.startTimer();

    this.alternatives = {
      left: this.roundData[this.round].alternatives.left,
      right: this.roundData[this.round].alternatives.right
    };

    tween(this.container, "slideInRight", "fast", null, () => {
      this.timeStamp = Date.now();
      this.sideLocked = null;
      this.allowInput = true;
    });
  }

  addPoints(points, timeBonus) {
    this.points += Math.round(((points * DIFFICULTY[2]) + timeBonus) / 2);
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
            id: 2,
            points: this.points,
            correctAnswers: this.correctAnswers,
            rounds: this.roundData.length,
            category: 'skrive',
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

  answer(event, side) {
    if (this.allowInput) {
      if (this.sideLocked) {
        if (side === this.sideLocked) {
          this.clearSelection();
          event.target.setAttribute('color', 'dark');
          this.lastClickedElement = event.target;
        } else {
          let guessedPair = this.sideLocked === "left" ? this.lastClickedElement.innerHTML + '-' + event.target.innerHTML : event.target.innerHTML + '-' + this.lastClickedElement.innerHTML;
          let correctAnswer = this.roundData[this.round].correctPairs.includes(guessedPair);

          this.allowInput = false;
          this.sideLocked = null;

          if (correctAnswer) {
            this.pairsRemoved++;
            let timeBonus = getTimeBonus(this.timeStamp, this.maxTimeTaken);
            this.addPoints(30, timeBonus);
            clearInterval(this.timerInterval);

            this.lastClickedElement.setAttribute('color', 'success');
            event.target.setAttribute('color', 'success');

            tween(event.target, "pulse", "slow", null, null);
            tween(this.lastClickedElement, "pulse", "slow", null, () => {
              this.lastClickedElement.style.visibility = "hidden";
              event.target.style.visibility = "hidden";
              this.lastClickedElement = null;

              setTimeout(() => {
                if (this.pairsRemoved == this.alternatives.left.length - 1) {
                  if (this.answeredCorrect) {
                    this.correctAnswers++;
                    addRoundStats(this.statsPoints, 'hurtighet', this.timeLeft, null);
                  }

                  this.allowInput = false;
                  this.endRound();
                } else {
                  this.timeLeft = this.maxTimeTaken;
                  this.allowInput = true;
                  this.startTimer();
                }
              }, 500);
            });
          } else {
            this.answeredCorrect = false;
            this.lastClickedElement.setAttribute('color', 'danger');
            event.target.setAttribute('color', 'danger');

            tween(event.target, "pulse", "fast", null, null);
            tween(this.lastClickedElement, "pulse", "fast", null, () => {
              this.clearSelection();
              this.lastClickedElement = null;
              this.allowInput = true;
            });
          }

          this.addRoundInfo(correctAnswer, guessedPair);
        }
      } else {
        this.sideLocked = side;
        event.target.setAttribute('color', 'dark');
        this.lastClickedElement = event.target;
      }
    }
  }

  addRoundInfo(answeredCorrect, answer) {
    let roundDifficulty = this.roundData[this.round].difficulty;
    addRoundStats(this.statsPoints, 'semantikk', roundDifficulty, answeredCorrect);

    if (!this.gameHistory[this.round]) this.gameHistory[this.round] = [];

    this.gameHistory[this.round].push({
      guessedWord: answer,
      answeredCorrect: answeredCorrect,
      timeTaken: (Date.now() - this.timeStamp) / 1000
    });
  }

  startTimer() {
    this.timerInterval = setInterval(() => {
      if (this.timeLeft > 0) this.timeLeft--;
    }, 1000);
  }
}
