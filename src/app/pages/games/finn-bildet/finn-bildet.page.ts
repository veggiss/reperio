import {Component, OnInit, ViewChild} from '@angular/core';
import {NavigationExtras, Router} from "@angular/router";
import {SmartAudioService} from "../../../services/providers/smart-audio.service";
import {CountUp} from "countup.js";
import {
    addRoundStats,
    DIFFICULTY,
    getFinnBildetData,
    getTimeBonus,
    loadImages,
    tween,
    getSoundMuted,
    toggleSoundMuted,
    PLAYER_STATS, loadImage
} from "../../../services/globals";
import {LoadingService} from "../../../services/loader/loading.service";

@Component({
  selector: 'app-finn-bildet',
  templateUrl: './finn-bildet.page.html',
  styleUrls: ['./finn-bildet.page.scss'],
})
export class FinnBildetPage implements OnInit {
    @ViewChild('container', null) container;
    @ViewChild('pointsElement', null) pointsElement;
    
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

    public getSoundMuted: any = getSoundMuted;
    public toggleSoundMuted: any = toggleSoundMuted;
    public gameHistory: any = {};
    public statsPoints: any = {};
    public images: any = ['', '', '', ''];    
    public maxTimeTaken: number = 30;
    public maxRounds: number = 7;

    constructor(private router: Router, private smartAudio: SmartAudioService, private loader: LoadingService) {}

    ngOnInit() {
        if (PLAYER_STATS.level < 3) {
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
        this.countUp = new CountUp('finn-bildet-points', 0); 
    }

    async ionViewWillEnter() {
        if (PLAYER_STATS.level < 3) return;
        
        this.container.style.visibility = "hidden";
        this.countUp.reset();
        this.round = 0;
        this.points = 0;
        this.correctAnswers = 0;
        this.gameHistory = {};
        this.roundData = getFinnBildetData(DIFFICULTY[3], this.maxRounds);
        this.precachedRoundData = JSON.parse(JSON.stringify(this.roundData));

        this.loader.loadingPresent();
        for (let i = 0; i < this.roundData.length; i++) {
            await loadImages(this.roundData[i].alternatives);
        }
        this.loader.loadingDismiss();
        
        this.startRound();
    }

    ionViewWillLeave() {
        clearInterval(this.timerInterval);
    }
    
    async startRound() {        
        this.container.style.visibility = "visible";
        this.timeLeft = this.maxTimeTaken;

        this.images = this.roundData[this.round].alternatives.map(e => '../../../../assets/img/games/images/' + e.src);

        let audioSrc = this.roundData[this.round].audioSrc;
        this.soundKey = audioSrc.split('.')[0];

        this.smartAudio.preload(this.soundKey, '../../../../assets/audio/speech/' + audioSrc);
        
        this.clearSelection();
        this.startTimer();

        this.playAudio('swosh_in');

        tween(this.container, "slideInRight", "fast", null, () => {
            this.timeStamp = Date.now();
            this.allowInput = true;
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
    
    playSound() {
        this.smartAudio.play(this.soundKey);
    }

    playAudio(key) {
        if (!getSoundMuted()) this.smartAudio.play(key);
    }
    
    answer(evt, guess) {
        if (this.allowInput) {
            this.allowInput = false;
            let answeredCorrect = this.roundData[this.round].alternatives[guess].answer;
            evt.target.style.borderColor = answeredCorrect ? '#10dc60' : '#f04141';
            clearInterval(this.timerInterval);

            if (answeredCorrect) {
                this.playAudio('correct_answer');
                let timeBonus = getTimeBonus(this.timeStamp, this.maxTimeTaken);
                this.addPoints(30, timeBonus);
                this.correctAnswers++;
                addRoundStats(this.statsPoints, 'hurtighet', this.timeLeft, null);
            } else {
                this.playAudio('wrong_answer');
            }

            this.addRoundInfo(answeredCorrect, this.roundData[this.round].alternatives[guess].text);

            tween(evt.target, "pulse", "slow", null, () => {
                setTimeout(() => {
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
        this.points += points + timeBonus;;
        this.countUp.update(this.points);
        tween(this.pointsElement, "tada", "slow", null, null);
    }

    clearSelection() {
        document.querySelectorAll('.imgButton').forEach((e: HTMLElement) => e.style.borderColor = '#FCFCFC');
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
