import {Component, OnInit, ViewChild} from '@angular/core';
import {
  addRoundStats,
  DIFFICULTY,
  getOrddelingData,
  getStatPoint,
  getTimeBonus, getTimeStat,
  loadImages,
  shuffle,
  tween,
  getSoundMuted,
  toggleSoundMuted, PLAYER_STATS
} from "../../../services/globals";
import {NavigationExtras, Router} from "@angular/router";
import {CountUp} from "countup.js";
import {SmartAudioService} from "../../../services/providers/smart-audio.service";

@Component({
  selector: 'app-ord-deling',
  templateUrl: './ord-deling.page.html',
  styleUrls: ['./ord-deling.page.scss'],
})
export class OrdDelingPage implements OnInit {
  @ViewChild('container', null) container;
  @ViewChild('pointsElement', null) pointsElement;
  
  public sideLocked: string;
  public lastClickedElement: HTMLElement;
  public countUp: any;
  public timeStamp: number;
  public round: number;
  public points: number;
  public roundData: any;
  public precachedRoundData: any;
  public allowInput: boolean;
  public questionImageSrc: any;
  public answeredCorrect: boolean;
  public correctAnswers: number;
  public timeLeft: number;
  public timerInterval: any;
  public alternatives: any;

  public getSoundMuted: any = getSoundMuted;
  public toggleSoundMuted: any = toggleSoundMuted;
  public maxTimeTaken: number = 30;
  public maxRounds: number = 5;
  public gameHistory: any = {};
  public statsPoints: any = {};
  public pairsRemoved: number = 0;

  constructor(private router: Router, private smartAudio: SmartAudioService) {}

  async ngOnInit() {
    if (PLAYER_STATS.level < 4) {
      this.router.navigate([`/`]);
      return;
    }
    
    this.smartAudio.preload('correct_answer', '../../../../assets/audio/fx/correct_answer.mp3');
    this.smartAudio.preload('countup_tick', '../../../../assets/audio/fx/countup_tick.mp3');
    this.smartAudio.preload('wrong_answer', '../../../../assets/audio/fx/wrong_answer.mp3');
    this.smartAudio.preload('clock_tick', '../../../../assets/audio/fx/clock_tick.mp3');
    this.smartAudio.preload('swosh_out', '../../../../assets/audio/fx/swosh_out.mp3');
    this.smartAudio.preload('swosh_in', '../../../../assets/audio/fx/swosh_in.mp3');

    this.container = this.container.el;
    this.pointsElement = this.pointsElement.el;
    this.countUp = new CountUp('ord-deling-points', 0);
  }

  async ionViewWillEnter() {
    if (PLAYER_STATS.level < 4) return;
    
    this.container.style.visibility = "hidden";
    this.countUp.reset();
    this.gameHistory = {};
    this.roundData = getOrddelingData(DIFFICULTY[4], this.maxRounds);
    this.precachedRoundData = JSON.parse(JSON.stringify(this.roundData));
    this.allowInput = false;
    this.correctAnswers = 0;
    this.round = 0;
    this.points = 0;
    
    this.startRound();
  }

  ionViewWillLeave() {
    clearInterval(this.timerInterval);
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

    this.playAudio('swosh_in');

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
    this.playAudio('swosh_out');
    tween(this.container, "slideOutLeft", "fast", "out", () => {
      this.container.style.visibility = "hidden";
      this.round++;

      if (this.round >= this.roundData.length) {
        let data: NavigationExtras = {
          state: {
            id: 4,
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

  playAudio(key) {
    if (!getSoundMuted()) this.smartAudio.play(key);
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
            this.playAudio('correct_answer');

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
            this.playAudio('wrong_answer');
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
      if (this.timeLeft > 0) {
        this.playAudio('clock_tick');
        this.timeLeft--;
      }
    }, 1000);
  }
}
