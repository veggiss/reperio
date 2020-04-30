import { Component, OnInit } from '@angular/core';
import {NavigationExtras, Router} from "@angular/router";
import {SmartAudioService} from "../../../services/providers/smart-audio.service";
import {CountUp} from "countup.js";
import {addRoundStats, DIFFICULTY, getFinnBildetData, getTimeBonus, loadImages, tween} from "../../../services/globals";

@Component({
  selector: 'app-finn-bildet',
  templateUrl: './finn-bildet.page.html',
  styleUrls: ['./finn-bildet.page.scss'],
})
export class FinnBildetPage implements OnInit {
    //public roundData: any;
    public container: HTMLElement;
    public pointsElement: HTMLElement;
    public roundData: any;
    public precachedRoundData: any;
    public countUp: any;
    public round: number;
    public points: number;
    public correctAnswers: number;
    public timeLeft: number;
    public timerInterval: any;
    public timeStamp: number;
    public allowInput: boolean;
    public soundKey: string;

    public gameHistory: any = {};
    public statsPoints: any = {};
    public images: any = ['', '', '', ''];    
    public maxTimeTaken: number = 30;
    public maxRounds: number = 10;

    constructor(private router: Router, private smartAudio: SmartAudioService) { }

    ngOnInit() {
        this.container = document.getElementById("main-container");
        this.pointsElement = document.getElementById('finn-bildet-points');
        this.countUp = new CountUp('finn-bildet-points', 0); 
    }

    async ionViewWillEnter() {
        this.container.style.visibility = "hidden";
        this.countUp.reset();
        this.round = 0;
        this.points = 0;
        this.correctAnswers = 0;
        this.roundData = getFinnBildetData(DIFFICULTY[4], this.maxRounds);
        this.precachedRoundData = JSON.parse(JSON.stringify(this.roundData));

        this.startRound();
    }
    
    async startRound() {
        await loadImages(this.roundData[this.round].alternatives);
        
        this.container.style.visibility = "visible";
        this.timeLeft = this.maxTimeTaken;

        this.images = this.roundData[this.round].alternatives.map(e => '../../../../assets/img/games/images/' + e.src);

        let audioSrc = this.roundData[this.round].audioSrc;
        this.soundKey = audioSrc.split('.')[0];

        this.smartAudio.preload(this.soundKey, '../../../../assets/audio/speech/' + audioSrc);
        
        this.clearSelection();
        this.startTimer();

        tween(this.container, "slideInRight", "fast", null, () => {
            this.timeStamp = Date.now();
            this.allowInput = true;
        });
    }
    
    endRound() {
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
    
    playSound() {
        this.smartAudio.play(this.soundKey);
    }
    
    answer(evt, guess) {
        if (this.allowInput) {
            this.allowInput = false;
            let answeredCorrect = this.roundData[this.round].alternatives[guess].answer;
            evt.target.style.borderColor = answeredCorrect ? '#10dc60' : '#f04141';
            clearInterval(this.timerInterval);

            if (answeredCorrect) {
                let timeBonus = getTimeBonus(this.timeStamp, this.maxTimeTaken);
                this.addPoints(30, timeBonus);
                this.correctAnswers++;
                addRoundStats(this.statsPoints, 'hurtighet', this.timeLeft, null);
            }

            this.addRoundInfo(answeredCorrect, this.roundData[this.round].alternatives[guess].text);

            tween(evt.target, "pulse", "slow", null, () => {
                setTimeout(() => {
                    this.allowInput = true;
                    this.clearSelection();
                    this.endRound();
                }, 500);
            });
        }
    }

    addRoundInfo(answeredCorrect, answer) {
        //addRoundStats(this.statsPoints, 'auditiv', roundDifficulty, answeredCorrect);
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

    addPoints(points, timeBonus) {
        this.points += points + timeBonus;//Math.round((points * DIFFICULTY[2]) + timeBonus);
        this.countUp.update(this.points);
        tween(this.pointsElement, "tada", "slow", null, null);
    }

    clearSelection() {
        document.querySelectorAll('.imgButton').forEach((e: HTMLElement) => e.style.borderColor = '#FCFCFC');
    }

    startTimer() {
        this.timerInterval = setInterval(() => {
            if (this.timeLeft > 0) this.timeLeft--;
        }, 1000);
    }
}
